import React from "react";
import styled from "styled-components";

const StyledHighlightedWrapper = styled.section`
  background-color: ${(props) => {
    return props.type === "Normal"
      ? props.theme.backgroundColors.highlightYellow
      : props.theme.backgroundColors.highlightRed;
  }};
  border-left-color: ${(props) => {
    return props.type === "Normal"
      ? props.theme.backgroundColors.highlightYellowSide
      : props.theme.backgroundColors.highlightRedSide;
  }};
  border-left-width: 9px;
  border-left-style: solid;
  padding: 20px 45px 20px 26px;
  margin: 20px;
  font-family:${props => props.theme.fonts.secondary};
`;

const StyledTitle = styled.h4`
  font-weight: 700;
  margin-bottom: 5px;
  font-family:${props => props.theme.fonts.primary};
`;

const HighlightedParagraph = (props) => {
  return (
    <StyledHighlightedWrapper type={props.type}>
      <StyledTitle>{props.title}</StyledTitle>
      {props.children}
    </StyledHighlightedWrapper>
  );
};

export default HighlightedParagraph;
