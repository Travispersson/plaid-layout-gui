import React, { useEffect, useState } from "react";
import ExperimentForm from "./ExperimentForm";
import CompoundForm from "./CompoundForm";
import ControlForm from "./ControlForm";
import SubmitForm from "./SubmitForm";
import Loader from "./../Loader";
import styled from "styled-components";
import HorizontalStepper from "./HorizontalStepper";
import { Formik, Form } from "formik";
import { config } from "../../Constants.js" // dev/prod variables

const axios = require("axios");
const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: auto;
  height: 60vh;
  width: 640px; /* size of horizontal stepper thingy .. */
`;

const StyledContainer = styled.div`
  overflow-y: scroll;
  height: 100vh;
`;

/* Token used by axios to cancel a sent post request */
var CancelToken = axios.CancelToken;
var cancel;
/**
 * This functions performs a post request when the form is submitted to the flask API using Axios with the current form state as payload.
 * Errors are propagated back from the API and displayed on screen. A cancel token is also used in order to cancel requests.
 * @param formData The form data that is sent to the API
 * @param setCancelRequest Setter state for the cancel state used in order to determine if the user has canceled the post request or not
 * @param setFlightState Setter state for the flight state used in order to determine if the user has posted the data or not which in turn renders a loading screen.
 * @param flightState State that determines if the request has been submitted or not
 * @param setData Setter for the passed form data
 * @return the plaid form and all its sub components
 */
async function postForm(
  formData,
  setResponseError,
  setCancelRequest,
  setFlightState,
  flightState,
  setData
) {
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json",
    },
    cancelToken: new CancelToken(function executor(c) {
      cancel = c;
    })
  };
  setFlightState({ ...flightState, loading: true, responseError: false });
  await axios
    .post(`${config.url.API_URL}`, formData, axiosConfig)
    .then((response) => {
      setFlightState({ ...flightState, loading: false, responseError: false });
      setData({
        rows: formData.num_rows,
        cols: formData.num_cols,
        sizeEmptyEdge: formData.size_empty_edge,
        controls: formData.control_names,
        result: response.data,
      });
    })

    .catch((error) => {
      if (axios.isCancel(error)) {
        setFlightState({ ...flightState, loading: false, responseError: false });
        setCancelRequest(false);
        return;
      }
      setFlightState({ ...flightState, loading: false, responseError: true });
      setResponseError({message: error.response.data.message, status: error.response.status});
    });
}

/**
 * This component contains the structure and logic of the PlaidForm component.
 * @param props the properties passed to the PlaidForm component.
 * @return the control form layout components
 */
const PlaidForm = (props) => {



  const [cancelRequest, setCancelRequest] = useState(false);
  useEffect(() => {
    if (cancelRequest) {
      cancel("Stop!");
    }
  }, [cancelRequest])


  const [flightState, setFlightState] = useState({
    loading: false,
    responseError: false,
  });
  const [responseError, setResponseError] = useState({message: "", status: 0});

  const [formState, setFormState] = useState({});
  React.useEffect(() => {
    if (!(JSON.stringify(formState) === "{}")) {
      postForm(
        formState,
        setResponseError,
        setCancelRequest,
        setFlightState,
        flightState,
        props.setData
      );
    }
  }, [formState]);

  /* This state is updated and passed to the combinationForm for persistent data accross steps */
  const [combinationForm, setCombinationForm] = useState({
    combinations: 0,
    combination_concentrations: 0,
    combination_names: [], // List
    combination_concentration_names: [], // List
  });
  /* This state is updated and passed to the compoundForm for persistent data accross steps */
  const [compoundForm, setCompoundForm] = useState({
    compounds: 0,
    compound_concentration_names: [], // List
    compound_concentration_indicators: [],
    compound_names: [], // List
    compound_concentrations: [],
    compound_replicates: [],

    groups:
      props.uploadedConfig &&
        props.uploadedConfig.compoundForm.groups.length > 0
        ? props.uploadedConfig.compoundForm
        : {
          delimiter: ",",
          selectedGroup: 0,
          groups: [
            {
              id: "gr-0",
              compound_names: "",
              compound_names_parsed: "",
              concentration_names: "",
              concentration_names_parsed: "",
              compound_replicates: 0,
            },
          ],
        },
  });

  /* This state is updated and passed to the controlForm for persistent data accross steps */

  const [controlForm, setControlForm] = useState({
    num_controls: 0,
    control_concentrations: [],
    control_replicates: [],
    control_names: [],
    control_concentration_names: [],
    groups:
      props.uploadedConfig && props.uploadedConfig.controlForm.groups.length > 0
        ? props.uploadedConfig.controlForm
        : {
          delimiter: ",",
          selectedGroup: 0,
          groups: [
            {
              id: "gr-0",
              concentration_names: "",
              concentration_names_parsed: "",
              control_replicates: 0,
              control_names: "",
              control_names_parsed: "",
            },
          ],
        },
  });
  const handleCompoundFormChange = (obj) => {
    setCompoundForm(obj);
  };

  const handleControlFormChange = (obj) => {
    setControlForm(obj);
  };

  /* This state is updated and passed to the experimentForm for persistent data accross steps */
  const [experimentForm, setExperimentForm] = useState(
    props.uploadedConfig
      ? props.uploadedConfig.experimentForm
      : {
        num_rows: 4,
        num_cols: 6,
        vertical_cell_lines: 1,
        horizontal_cell_lines: 1,
        allow_empty_wells: false,
        size_empty_edge: 0,
        concentrations_on_different_rows: false,
        concentrations_on_different_columns: false,
        replicates_on_different_plates: false,
        replicates_on_same_plate: false,
        selected: 48,
      }
  );
  const handleExperimentFormChange = (obj) => {
    setExperimentForm(obj);
  };
  /* from the Stepper component */
  const [step, setStep] = useState(0);

  /* Takes the stepper to the next step */
  const handleNext = () => {
    setLoading(true);
  };

  /* Takes the stepper to the previous step */
  const handlePrev = () => {
    setStep(step - 1);
  };
  /* This useEffect hook is fired when the loading screen is active. It assembles all the spread out forms into a single mergedState which can be passed to the API*/
  const [loading, setLoading] = useState(false);
  React.useEffect(() => {
    if (loading) {
      if (step !== 3) {
        setStep(step + 1);
      } else {
        const property = "groups";
        const { [property]: _, ...finalCompoundForm } = compoundForm;
        const { groups, ...finalControlForm } = controlForm;
        const { selected, ...finalExperimentForm } = experimentForm;

        const mergedState = {
          ...finalExperimentForm,
          ...finalCompoundForm,
          ...finalControlForm,
          ...combinationForm,
        };
        setFormState(mergedState);
      }
    }
    setLoading(false);
  }, [loading, step]);
  return (
    <StyledContainer>
      {flightState["loading"] ? (
        <Loader setCancelRequest={setCancelRequest} />
      ) : (
        <Formik>
          <StyledForm>
            <HorizontalStepper
              currentStep={step}
              labels={[
                "Experiment Setup",
                "Compound Setup",
                "Experiment Validation",
                "Submit Form",
              ]}
            />
            {step === 0 && (
              <ExperimentForm
                handleNext={handleNext}
                handlePrev={handlePrev}
                experimentState={experimentForm}
                handleExperimentFormChange={handleExperimentFormChange}
              />
            )}
            {step === 1 && (
              <CompoundForm
                handleNext={handleNext}
                handlePrev={handlePrev}
                compoundState={compoundForm}
                handleCompoundFormChange={handleCompoundFormChange}
              />
            )}
            {step === 2 && (
              <ControlForm
                handleNext={handleNext}
                handlePrev={handlePrev}
                handleControlFormChange={handleControlFormChange}
                controlState={controlForm}
              />
            )}
            {step === 3 && (
              <SubmitForm
                handleNext={handleNext}
                handlePrev={handlePrev}
                experimentForm={experimentForm}
                compoundForm={compoundForm}
                controlForm={controlForm}
                responseError={responseError}
              ></SubmitForm>
            )}
          </StyledForm>
        </Formik>
      )}
    </StyledContainer>
  );
};

export default PlaidForm;
