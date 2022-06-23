import React from "react";
import styled from "styled-components";

/* covers the positioning and styling of the switches */
const StyledSwitchWrapper = styled.div`
  display: flex;
  flex-direction: row;
  font-family: ${(props) => props.theme.fonts.secondary};
  margin-top: 5px;
  margin-bottom:5px;
  font-size: 12px;
`;

/* covers the styling of each switch option */
const StyledSwitch = styled.div`
  cursor: pointer;
  margin-right: 10px;
  color: rgba(0, 0, 0, 0.6);

  ${(props) =>
    props.active &&
    `
    color: black;`}
`;

/* covers the positioning of the label of what the switches are for */
const StyledLabel = styled.span`
  margin-right: 10px;
`;
const StyledColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

/**
 * Renders the switches used to change what is labeled
 * @param props.handleToggleLabel callback function for handling the clicking of a switch (label)
 * @param props.handleToggleWell callback function for handling the clicking of a switch (well)
 * @param props.activeLabel
 * @param props.activeWell
 */
const Switch = (props) => {
  /**
   * will propagate the targeted id of the element clicked to parent component
   */
  const handleClickLabel = (e) => {
    e.preventDefault();
    let activated =
      e.currentTarget.id === props.activeLabel ? "none" : e.currentTarget.id;
    props.handleToggleLabel(activated);
  };
  const handleClickWell = (e) => {
    e.preventDefault();
    let activated =
      e.currentTarget.id === props.activeWell ? "none" : e.currentTarget.id;
    props.handleToggleWell(activated);
  };
  return (
    <StyledColumn>
      <StyledSwitchWrapper>
        <StyledLabel>Toggle Labels:</StyledLabel>
        <StyledSwitch
          active={props.activeLabel === "compound"}
          id={"compound"}
          onClick={handleClickLabel}
        >
          Compound
        </StyledSwitch>
        <StyledSwitch
          active={props.activeLabel === "concentration"}
          id={"concentration"}
          onClick={handleClickLabel}
        >
          Concentration
        </StyledSwitch>
        <StyledSwitch
          active={props.activeLabel === "both"}
          id={"both"}
          onClick={handleClickLabel}
        >
          Both
        </StyledSwitch>
      </StyledSwitchWrapper>
      <StyledSwitchWrapper>
        <StyledLabel>Toggle Wells:</StyledLabel>
        <StyledSwitch
          active={props.activeWell === "compounds"}
          id={"compounds"}
          onClick={handleClickWell}
        >
          Compounds
        </StyledSwitch>
        <StyledSwitch
          active={props.activeWell === "controls"}
          id={"controls"}
          onClick={handleClickWell}
        >
          Controls
        </StyledSwitch>
      </StyledSwitchWrapper>
    </StyledColumn>
  );
};

export default Switch;
