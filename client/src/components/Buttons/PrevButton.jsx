import React from "react";
import styled from "styled-components";
/* import { BiLeftArrowAlt } from "react-icons/bi"; */
const StyledButton = styled.button`
  font-family: Whitney, "Open Sans", Helvetica, sans-serif;
  background-color: #323439;
  border: 2px solid #323439;;
  color: #fff;
  font-weight: 400;
  font-size: 16pt;
  border-radius: 25px;
  cursor: pointer;
  height: 45px;
  width: 150px;
  margin-left: 20px;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);
  &:hover {
    outline: none;
    border: 1px solid #5096ff;
  }
`

const PrevButton = (props) => {
  return (
    <StyledButton title={props.title} type="button" onClick={props.onClick}>
      {props.children}
    </StyledButton>
  );
};

export default PrevButton;
