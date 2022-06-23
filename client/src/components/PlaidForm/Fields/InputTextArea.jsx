import React from "react";
import styled from "styled-components";

const StyledTextAreaFieldContainer = styled.div`
  margin-top: 5px;
  margin-bottom: 5px;
  display: flex;
  flex-direction: column;
`;

const StyledLabel = styled.label`
  font-family: ${(props) => props.theme.fonts.primary};
  font-size: 14px;
  margin-bottom: 2.5px;
`;

const StyledTextArea = styled.textarea`
  /* todo set sizes  */
  min-width: 640px;
  max-width: 640px;
  min-height: 180px;
  max-height: 500px;
  padding: 10px;
  border-radius: 7px;
  border: 1px solid #ccc;
  &:focus {
    outline:none;
    border: 1px solid #5096FF;
  }
  font-family: ${(props) => props.theme.fonts.secondary};
  font-size: 14px;
`;

const StyledErrorMessage = styled.div`
  font-size: 12px;
  color: red;
  font-family: ${(props) => props.theme.fonts.secondary};
  height: 15px;
`;

const InputTextArea = (props) => {
  const handleChange = (event) => {
    props.onChange(event);
  };

  return (
    <StyledTextAreaFieldContainer>
      <StyledLabel htmlFor={props.name}>{props.label}</StyledLabel>
      <StyledTextArea
        id={props.name}
        name={props.name}
        placeholder={props.placeholder}
        onChange={handleChange}
        disabled={props.disable} //true or false..
        value={props.value}
      />
      <StyledErrorMessage>{props.errorMsg}</StyledErrorMessage>
    </StyledTextAreaFieldContainer>
  );
};

export default InputTextArea;
