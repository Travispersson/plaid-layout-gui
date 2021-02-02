import React, { useState } from "react";
import HorizontalStepper from "./HorizontalStepper";
import { Formik, Form } from "formik";
import styled from "styled-components";
const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: auto;
  height: 60vh;
  width: 40vw;
`;
const ErrorNotice = styled.div`
  align-self: center;
  display: ${(props) => (props.error ? "flex" : "none")};
  flex-direction: row;
  color: black;
  justify-content: center;
  align-items: center;
  height: 8vh;
  width: 35vw;
  margin: auto;
`;

const StyledInputContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: start;
`;
const StyledNextButton = styled.button`
  margin-left: auto;
  background: #0069eb;
  color: #fff;
  border: none;
  border-radius: 0px;
  font-size: 16px;
  padding: 12px 26px;
  text-decoration: none;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`;
const StyledPrevButton = styled.button`
  background: #a6a6a6;
  color: #fff;
  border: none;
  border-radius: 0px;
  font-size: 16px;
  padding: 12px 26px;
  text-decoration: none;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`;
const StyledButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 15px;
`;
const Stepper = ({ children, ...props }) => {
  const childrenArray = React.Children.toArray(children);
  const [step, setStep] = useState(0);
  const [errorState, setErrorState] = useState(true);
  //Child to display on current step. 0 would be immediate child.
  const currentChild = childrenArray[step];
  function isLast() {
    return step === childrenArray.length - 1;
  }
  function hasErrors(errors) {
    for (let key in errors) {
        
      if (errors[key] !== null ) {
        return true;
      }
    }
    return false;
  }

  const [loading, setLoading] = useState(false);

  /* TODO: onChange eller onClick? Hur hanterar jag då onClick validering, väntar på svar och avgör sedan om vi går next eller ej?
             om jag väljer onChange, hur kan vi stoppa valideringen från att köra på de tomma fälten innan man använt toolen? */
function handleNext() {
    // if(noErrors(errors)){
    if (step === 1) {
      props.addCompoundsToState();
    }
    setLoading(true);
  }

  React.useEffect(() => {
    if (loading) {
      let errors = props.formUtils.onClick();
      console.log("Step: " + step);
      console.log(errors);
      console.log(hasErrors(errors));

      if (!hasErrors(errors)) {
        setStep(step + 1);
      }
      setLoading(false);
    }
  }, [loading,step,props.formUtils]);

  return (
    <Formik {...props} initialValues={props.initialValues}>
      <>
        <ErrorNotice error={props.flightState["responseError"]}>
          {" "}
          {props.flightState["responseError"] ? props.responseError : null}
        </ErrorNotice>
        <StyledForm>
          <HorizontalStepper currentStep={step} steps={childrenArray} />
          <StyledInputContainer>{currentChild}</StyledInputContainer>
          <StyledButtonContainer>
            {step > 0 ? (
              <StyledPrevButton type="button" onClick={() => setStep(step - 1)}>
                Previous
              </StyledPrevButton>
            ) : null}
            <StyledNextButton
              type="button"
              onClick={
                isLast()
                  ? () =>
                      props.postForm(
                        props.initialValues,
                        props.setResponseError,
                        props.setFlightState,
                        props.flightState,
                        props.setData
                      )
                  : () => handleNext()
              }
            >
              {isLast() ? "Submit" : "Next"}
            </StyledNextButton>
          </StyledButtonContainer>
        </StyledForm>
      </>
    </Formik>
  );
};
export default Stepper;
