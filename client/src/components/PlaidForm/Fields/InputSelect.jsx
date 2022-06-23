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

const StyledSelectField = styled.select`
  max-width: 120px;
  border-radius: 7px;
  border: 1px solid #ccc;
  padding: 7px;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Ctitle%3Edown-arrow%3C%2Ftitle%3E%3Cg%20fill%3D%22%23000000%22%3E%3Cpath%20d%3D%22M10.293%2C3.293%2C6%2C7.586%2C1.707%2C3.293A1%2C1%2C0%2C0%2C0%2C.293%2C4.707l5%2C5a1%2C1%2C0%2C0%2C0%2C1.414%2C0l5-5a1%2C1%2C0%2C1%2C0-1.414-1.414Z%22%20fill%3D%22%23000000%22%3E%3C%2Fpath%3E%3C%2Fg%3E%3C%2Fsvg%3E");
  background-size: 0.6em;
  background-position: calc(100% - 1em) center;
  background-repeat: no-repeat;

  &:focus {
    outline: none;
    border: 1px solid #5096ff;
  }
  font-size: 12px;
  font-family: ${(props) => props.theme.fonts.secondary};
  option {
    color: black;
    background: white;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
  }
`;

const StyledErrorMessage = styled.div`
  font-size: 12px;
  color: red;
  font-family: ${(props) => props.theme.fonts.secondary};
  height: 15px;
`;

const InputSelect = (props) => {
  return (
    <StyledNumberFieldContainer>
      <StyledLabel htmlFor={props.name}>{props.label}</StyledLabel>
      <StyledSelectField
        id={props.id}
        name={props.name}
        onChange={props.onChange}
        value={props.value}
        onFocus={props.onFocus}
      >
        {props.children}
      </StyledSelectField>
      <StyledErrorMessage>{props.errorMsg}</StyledErrorMessage>
    </StyledNumberFieldContainer>
  );
};

export default InputSelect;
