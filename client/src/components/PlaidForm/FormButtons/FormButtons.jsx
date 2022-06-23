import React from "react";
import NextButton from "../../Buttons/NextButton";
import PrevButton from "../../Buttons/PrevButton";
import SubmitButton from "../../Buttons/SubmitButton";
import styled from "styled-components";

const StyledButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin: 10px;
`;

const FormButtons = ({ submit, onClickNext, onClickPrev, step, title }) => {
  return (
    <StyledButtonContainer>
      {step > 0 ? (
        <PrevButton
          title={title ? title : "Previous form page"}
          onClick={onClickPrev}
        >
          Previous
        </PrevButton>
      ) : null}
      {step < 3 ? (
        <NextButton title={"Next form page"} onClick={onClickNext}>
          Next
        </NextButton>
      ) : null}
      {submit ? (
        <NextButton title={"Submit form"} onClick={onClickNext}>
          Submit Form
        </NextButton>
      ) : null}
    </StyledButtonContainer>
  );
};

export default FormButtons;
