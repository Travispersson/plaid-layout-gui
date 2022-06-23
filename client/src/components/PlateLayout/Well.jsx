import React from "react";
import styled from "styled-components";
import truncateString from "./../../functions/truncateString.js";

/* covers the styling and positioning of the well */
const StyledWell = styled.div.attrs((props) =>
  props.empty
    ? {
        style: {
          gridRow: props.row,
          gridColumn: props.col,
          backgroundColor: props.color,
        },
      }
    : {
        style: {
          gridRow: props.row,
          gridColumn: props.col,
          backgroundColor: props.color,
          opacity: props.lighten ? 0.2 : 1,
        },
      }
)`
  border-radius: 50%;
`;

/* covers the styling and positioning of the label (concum/cmpdname) of a well */
const StyledLabel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-family:${props => props.theme.fonts.primary};
  font-weight: bold;
  color: #000;
  margin: auto;
  text-align: center;
  width: ${(props) => props.wellRad}px;
  height: ${(props) => props.wellRad}px;
`;

const StyledColLabel = styled.div`
  font-size: 12px;
  font-family:${props => props.theme.fonts.primary};
  font-weight: bold;
  color: #000;
`;

const StyledColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  text-align: center;
  width: ${(props) => props.wellRad}px;
  height: ${(props) => props.wellRad}px;
`;

/**
 * Will render the component of a well on the plate.
 * 
 * @param props.empty true if well is empty otherwise false
 * @param props.toggleState.selected name of selected compound, <empty_string> if none is selected
 * @param props.toggleState.well compounds if compounds to be highlighted, controls if controls to be highlighted otherwise "none"
 * @param props.wellRad radius of well
 * @param props.controls list containing names of control compounds
 * @param props.toggleState.label "none" if no label should be displayed, otherwise "compound" / "concentration"
 * @param props.row the row positioning of well
 * @param props.col the col positioning of well
 * @param cmpdObj the compound object 
 *        attrs of cmpdObj:
                CONCuM
                cmpdname
                cmpdnum
                plateID
                well
 * @param color the hsla color (hex if props.empty == true)
 */
const Well = (props) => {
  let color = props.color;
  let title = "";
  if (!props.empty) {
    var lighten = false;
    if (props.toggleState.well !== "none") {
      if (
        props.toggleState.well === "compounds" &&
          props.controls.includes(props.cmpdObj.cmpdname)
      ) {
        lighten = true;
      }
      if (
        props.toggleState.well === "controls" &&
        !props.controls.includes(props.cmpdObj.cmpdname)
      ) {
        lighten = true;
      }
    } else {
      if (
        props.toggleState.selected !== "" &&
        props.toggleState.selected  !== props.cmpdObj.plateID + props.cmpdObj.cmpdname
      ) {
        lighten = true;
      }
    }
    title = props.cmpdObj.cmpdname + "\n" + props.cmpdObj.CONCuM;
  }

  return (
    <StyledWell
      empty={props.empty}
      row={props.row}
      col={props.col}
      color={color}
      lighten={lighten}
      title={title}
    >
      {!props.empty && props.toggleState.label !== "none" ? (
        props.toggleState.label === "both" ? (
          <StyledColumn wellRad={props.wellRad}>
            <StyledColLabel>
              {truncateString(props.cmpdObj.cmpdname, 5)}
            </StyledColLabel>
            <StyledColLabel>
              {truncateString(props.cmpdObj.CONCuM, 5)}
            </StyledColLabel>
          </StyledColumn>
        ) : (
          <StyledLabel wellRad={props.wellRad}>
            {props.toggleState.label === "compound"
              ? truncateString(props.cmpdObj.cmpdname, 5)
              : truncateString(props.cmpdObj.CONCuM, 5)}
          </StyledLabel>
        )
      ) : (
        ""
      )}
    </StyledWell>
  );
};

export default Well;
