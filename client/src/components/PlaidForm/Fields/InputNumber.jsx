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

const StyledNumberField = styled.input`
  max-width: 80px;
  border-radius: 7px;
  border: 1px solid #ccc;
  padding: 7px;
  &:focus {
    outline: none;
    border: 1px solid #5096ff;
  }
  font-family: ${(props) => props.theme.fonts.secondary};
  font-size:12px;
`;

const StyledErrorMessage = styled.div`
  font-size: 12px;
  color: red;
  font-family: ${(props) => props.theme.fonts.secondary};
  height: 15px;
`;

const InputNumber = (props) => {
  const handleChange = (event) => {
    props.onChange(event);
  };
  return (
    <StyledNumberFieldContainer>
      <StyledLabel htmlFor={props.name}>{props.label}</StyledLabel>
      <StyledNumberField
        id={props.name}
        name={props.name}
        type="number"
        onChange={handleChange}
        value={props.value}
      />
      <StyledErrorMessage>{props.errorMsg}</StyledErrorMessage>
    </StyledNumberFieldContainer>
  );
};

export default InputNumber;
