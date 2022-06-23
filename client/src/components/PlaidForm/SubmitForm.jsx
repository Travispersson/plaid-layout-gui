import React, { useReducer } from "react";
import HighlightedParahraph from "../Instructions/HighlightedParagraph";
import styled from "styled-components";
import useValidation from "./Validation/useValidation";
import utils, { hasErrors } from "./utils";

const StyledContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: auto;
`;

const StyledParagraph = styled.p`
  font-size: 18px;
  line-height: 1.7;
  font-weight: 400;
  font-style: normal;
  font-family: ${(props) => props.theme.fonts.secondary};
  margin: 25px 0px 25px 0px
`;

const StyledRowContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  justify-content: center;
`;


const StyledSubmitButton = styled.button`
  font-family: Whitney, "Open Sans", Helvetica, sans-serif;
  background-color: #5096FF;
  border: 2px solid #5096FF;
  color: #fff;
  font-weight: 400;
  font-size: 16pt;
  border-radius: 25px;
  cursor: pointer;
  height: 45px;
  width: 200px;
  margin-left: 10px;
  margin-right: 10px;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);
  &:hover {
    outline: none;
    border: 1px solid #5096ff;
  }
`
const StyledPrevButton = styled.button`

  font-family: Whitney, "Open Sans", Helvetica, sans-serif;
  background-color: #323439;
  border: 2px solid #323439;
  color: #fff;
  font-weight: 400;
  font-size: 16pt;
  border-radius: 25px;
  cursor: pointer;
  height: 45px;
  width: 200px;
  margin-left: 10px;
  margin-right: 10px;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);
  &:hover {
    outline: none;
    border: 1px solid #5096ff;
  }
`
const StyledButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-left: 40px;
  margin-right: 40px;
`
const StyledHeader = styled.h1`
  font-size: 36pt;
  font-weight: bold;
`
const StyledErrorContainer = styled.div`
  height: 450px;
`;

/**
 * This function handles the download json component of the application
 * 
 * @param data the current input data
 */
const handleDownload = async (data) => {
  const json = JSON.stringify(data);
  const blob = new Blob([json], { type: "application/json" });
  const href = await URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = href;
  link.download = "config.json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
/**
 * This component represents the final page of the application.
 *
 * @param handleNext Function that sets a loading screen or steps to the next form
 * @param handlePrev Function that steps the stepper back one step
 * @param experimentForm The current input data in the experiment form
 * @param compoundForm The current input data in the compound form
 * @param controlForm The current input data in the control form
 * @return the submit page layout and components
 */

const SubmitForm = ({
  handleNext,
  handlePrev,
  experimentForm,
  compoundForm,
  controlForm,
  responseError,
}) => {

  let config = {
    submit: {
      wrongWellCount: {
        value: {
          experimentForm: experimentForm,
          compoundForm: compoundForm,
          controlForm: controlForm,
        },
        message: {
          hasEmptyWells: "You have empty wells! Add more compounds, replicates, controls or make sure to tick allow the empty wells box to support empty wells.",
          tooFewWells: "You don't have enough wells for the amount of compounds, replicates and controls specified!",
        }
      },
    },
  };

  let [errors, utils] = useValidation({}, config);
  /* This effect triggers once the validation state changes */
  const [validating, setValidating] = React.useState(false);
  React.useEffect(() => {
    if (validating) {
      const submitErrors = utils.onClick();
      if (!hasErrors(submitErrors)) {
        handleNext();
      }
      setValidating(false);
    }
  }, [validating]);

  let data = {
    experimentForm: experimentForm,
    delimiterCompounds: compoundForm.groups.delimiter,
    compoundForm: {
      groups: compoundForm.groups.groups,
    },
    delimiterControls: controlForm.groups.delimiter,
    controlForm: {
      groups: controlForm.groups.groups,
    },
  };
  const onClick = (action) => {
    if (action === "submit") {
      setValidating(true);
    } else if (action === "prev") {
      handlePrev();
    } else {
    }
  };
  return (<>
    <StyledErrorContainer>{errors.wrongWellCount ? <HighlightedParahraph title={"Error: Invalid Wells"} type={"Warning"}> {errors.wrongWellCount}</HighlightedParahraph>
      : responseError.status === 2 ? <HighlightedParahraph title={"Error: Unsatisfied Model "} type={"Warning"}> {responseError.message}</HighlightedParahraph> 
      : responseError.status === 400 ? <HighlightedParahraph title={"Error: Bad Request"} type={"Warning"}> {responseError.message}</HighlightedParahraph> 
      : null}</StyledErrorContainer>
    <StyledContainer>
      <StyledHeader> You're almost done.</StyledHeader>
      <StyledParagraph> You can go back and review your input,
        save your form input allowing you to easily prepopulate the form in future runs or submit the form to generate your plate layout!
      </StyledParagraph>
      <StyledRowContainer>
        <StyledButtonWrapper>
          <StyledPrevButton type='button' onClick={() => onClick("prev")}> Previous</StyledPrevButton>
          <StyledPrevButton type='button' onClick={() => handleDownload(data)}> Download Input</StyledPrevButton>
          <StyledSubmitButton type='button' onClick={() => onClick("submit")}> Submit Form</StyledSubmitButton>
        </StyledButtonWrapper>
      </StyledRowContainer>
    </StyledContainer>
  </>
  );
};

export default SubmitForm;
