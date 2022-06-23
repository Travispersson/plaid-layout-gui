import React from "react";
import styled from "styled-components";

const StyledNumberFieldContainer = styled.div`
  margin: 5px;
  margin-left: 0px;
  display: flex;
  flex-direction: column;
`;

const StyledLabel = styled.label`
  font-family: ${(props) => props.theme.fonts.primary};
  font-size: 14px;
  margin-bottom: 2.5px;
  margin-right: 5px;
`;

const StyledSelectField = styled.input`
  width: 20px;
  &:focus {
    outline: none;
    border: 1px solid #5096ff;
  }
`;

const StyledRowContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledErrorMessage = styled.div`
  font-size: 12px;
  color: red;
  font-family: ${(props) => props.theme.fonts.secondary};
  height: 15px;
`;

const InputCheck = (props) => {
  return (
    <StyledNumberFieldContainer>
      <StyledRowContainer>
        <StyledLabel htmlFor={props.name}>{props.label}</StyledLabel>
        <StyledSelectField
          id={props.name}
          name={props.name}
          type="checkbox"
          onChange={props.onChange}
          value={props.value}
          checked={props.checked}
        />
      </StyledRowContainer>
      <StyledErrorMessage>{props.errorMsg}</StyledErrorMessage>
    </StyledNumberFieldContainer>
  );
};

export default InputCheck;
