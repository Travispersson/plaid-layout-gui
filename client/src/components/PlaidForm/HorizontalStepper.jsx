import styled from "styled-components";
import { React } from "react";
import { ReactComponent as Checkmark } from "../../assets/icons/check-solid.svg";

const HoriztonalStepperContainer = styled.ul`
  align-self: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 60px;
  margin: 20px;
`;
const HoriztonalStepperProgress = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 80px;
  padding: 0 80px;
  height: 100%;
  font-size: 12px;
`;

const HoriztonalStepperProgressIcon = styled.div`
  position: relative;
  height: 30px;
  width: 30px;
  display: flex;
  justify-content: center;
  padding-top: 5px;
  background-color: ${(props) => (props.current ? "#5096FF" : "#E0E0E0")};
  border-radius: 100%;
  transition: all 0.3s ease-out;
  &:after {
    content: "";
    position: absolute;
    background-color: ${(props) => (props.finished ? "#5096FF" : "#E0E0E0")};
    height: 2px;
    width: 140px;
    top: 15px;
    left: 30px;
    display: ${(props) => (props.isLast ? "none" : "inline-block")};
  }
`;

/**
 * This component renders the horizontal stepper for the tool 
 * @param currentStep The current step index
 * @param labels The names of each step in the stepper
 * @return the layout and steps used in the horizontal stepper
*/
const HoriztonalStepper = ({ currentStep, labels = [] }) => {
  return (
    <HoriztonalStepperContainer>
      {labels.map((child, index) => (
        <HoriztonalStepperProgress key={"step" + index}>
          <HoriztonalStepperProgressIcon
            finished={currentStep > index}
            current={currentStep >= index}
            isLast={index === labels.length - 1}
          >
            {currentStep > index ? <Checkmark length={30} /> : null}
          </HoriztonalStepperProgressIcon>
          {labels[index]}
        </HoriztonalStepperProgress>
      ))}
    </HoriztonalStepperContainer>
  );
};
export default HoriztonalStepper;
