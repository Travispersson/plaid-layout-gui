import React, { useState } from "react";
import ExperimentForm from "./ExperimentForm";
import CompoundForm from "./CompoundForm";
import ControlForm from "./ControlForm";
import SubmitForm from "./SubmitForm";
import Loader from "./../Loader";
import styled from "styled-components";
import HorizontalStepper from "./HorizontalStepper";
import { Formik, Form } from "formik";

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
const StyledWave = styled.div`
  height: 20vh;
  width: 100%;
  transform: skewY(-11deg);
  background-color: red;
`;
async function postForm(
  formData,
  setResponseError,
  setFlightState,
  flightState,
  setData
) {
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  setFlightState({ ...flightState, loading: true, responseError: false });
  await axios
    .post("http://localhost:5000/", formData, axiosConfig)
    .then((response) => {
      setFlightState({ ...flightState, loading: false, responseError: false });

      setData({
        rows: formData.num_rows,
        cols: formData.num_cols,
        sizeEmptyEdge: formData.size_empty_edge,
        result: response.data,
      });
    })
    .catch((error) => {
      setFlightState({ ...flightState, loading: false, responseError: true });
      setResponseError(error.response.data.message);
    });
}
const PlaidForm = (props) => {
  const [flightState, setFlightState] = useState({
    loading: false,
    responseError: false,
  });
  const [responseError, setResponseError] = useState("");
  const [formState, setFormState] = useState({});
  React.useEffect(() => {
    if (!(JSON.stringify(formState) === "{}")) {
      postForm(
        formState,
        setResponseError,
        setFlightState,
        flightState,
        props.setData
      );
    }
  }, [formState]);

  const [combinationForm, setCombinationForm] = useState({
    combinations: 0,
    combination_concentrations: 0,
    combination_names: [], // List
    combination_concentration_names: [], // List
  });
  /* prepopulate or default object */
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
                concentration_names_parsed:"",
                compound_replicates: 0,
              },
            ],
          },
  });

  /* prepopulate or default object */
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
                concentration_names_parsed:"",
                control_replicates: 0,
                control_names: "",
                control_names_parsed:"",
              },
            ],
          },
  });
  /* prepopulate or default object */

  const handleCompoundFormChange = (obj) => {
    setCompoundForm(obj);
  };

  const handleControlFormChange = (obj) => {
    setControlForm(obj);
  };

  /* prepopulate or default object */
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

  const handleNext = () => {
    setLoading(true);
  };

  const handlePrev = () => {
    setStep(step - 1);
  };
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
        <Loader />
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
                combinationState={combinationForm}
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
              ></SubmitForm>
            )}
          </StyledForm>
        </Formik>
      )}
    </StyledContainer>
  );
};

export default PlaidForm;
