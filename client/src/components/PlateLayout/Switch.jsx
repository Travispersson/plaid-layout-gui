import React from "react";
import styled from "styled-components";

/* covers the positioning and styling of the switches */
const StyledSwitchWrapper = styled.div`
  display: flex;
  flex-direction: row;
  font-family: ${props => props.theme.fonts.secondary};
  margin-top:5px;
  margin-bottom: 20px;
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


/**
 * Renders the switches used to change what is labeled
 * @param props.handleDisplay callback function for handling the clicking of a switch
 */
const Switch = (props) => {
  const [active, setActive] = React.useState("none");

  /**
   * will propagate the targeted id of the element clicked to parent component
   */
  const handleClick = (e) => {
    e.preventDefault();
    let activated = e.currentTarget.id === active ? "none" : e.currentTarget.id;
    setActive(activated);
    props.handleDisplay(activated);
  };
  return (
    <StyledSwitchWrapper>
      <StyledLabel>TOGGLE:</StyledLabel>
      <StyledSwitch
        active={active === "none"}
        id={"none"}
        onClick={handleClick}
      >
        None
      </StyledSwitch>
      <StyledSwitch
        active={active === "compound"}
        id={"compound"}
        onClick={handleClick}
      >
        Compound
      </StyledSwitch>
      <StyledSwitch
        active={active === "concentration"}
        id={"concentration"}
        onClick={handleClick}
      >
        Concentration
      </StyledSwitch>
      <StyledSwitch
        active={active === "all"}
        id={"all"}
        onClick={handleClick}
      >
        All
      </StyledSwitch>
    </StyledSwitchWrapper>
  );
};

export default Switch;
