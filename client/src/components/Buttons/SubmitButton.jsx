import React from "react";
import styled from "styled-components";
/* import { BiRightArrowAlt } from "react-icons/bi"; */

const StyledButton = styled.button`
  display: inline-block;
  font-family: Whitney, "Open Sans", Helvetica, sans-serif;
  background-color: #7289da;
  border: 2px solid #7289da;
  color: #fff;
  font-weight: 400;
  font-size: 16pt;
  border-radius: 25px;
  cursor: pointer;
  height: 45px;
  width: 200px;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);
  &:hover {
    outline: none;
    border: 1px solid #5096ff;
  }
`;

const NextButton = (props) => {
    return (
        <StyledButton title={props.title} type="button" onClick={props.onClick}>
            {props.children}
        </StyledButton>
    );
};

export default NextButton;
