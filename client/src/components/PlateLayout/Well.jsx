import React from "react";
import styled from "styled-components";

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
  font-family: "Roboto", sans-serif;
  font-weight: bold;
  color: #000;
  margin: auto;
  text-align: center;
  width: ${(props) => props.wellRad}px;
  height: ${(props) => props.wellRad}px;
`;


/**
 * Will render the component of one well from plate.
 * 
 * @param props.empty true if well is empty otherwise false
 * @param props.selected name of selected compound, <empty_string> if none is selected
 * @param props.wellRad radius of well
 * @param props.display "none" if no label should be displayed, otherwise "compound" / "concentration"
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
  var color = props.color;
  if (!props.empty) {
    var lighten = false;
    if (
      props.selected !== "" &&
      props.selected !== props.cmpdObj.plateID + props.cmpdObj.cmpdname
    ) {
      lighten = true;
    }
  }

  return (
    <StyledWell
      empty={props.empty}
      row={props.row}
      col={props.col}
      color={color}
      lighten={lighten}
    >
      {!props.empty && props.display !== "none" ? (
        <StyledLabel wellRad={props.wellRad}>
          {props.display === "compound"
            ? props.cmpdObj.cmpdname
            : props.cmpdObj.CONCuM}
        </StyledLabel>
      ) : (
        ""
      )}
    </StyledWell>
  );
};

export default Well;
