import React from "react";
import NextButton from "../../Buttons/NextButton";
import PrevButton from "../../Buttons/PrevButton";
import styled from "styled-components";

const StyledButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin: 10px;
`;

const FormButtons = ({ isLast, onClickNext, onClickPrev, step }) => {
  return (
    <StyledButtonContainer>
      {step > 0 ? <PrevButton onClick={onClickPrev} /> : null}
      <NextButton onClick={onClickNext} isLast={isLast} />
    </StyledButtonContainer>
  );
};

export default FormButtons;