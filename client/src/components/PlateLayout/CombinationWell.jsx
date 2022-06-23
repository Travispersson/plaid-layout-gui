import React from "react";
import styled from "styled-components";
import truncateString from "./../../functions/truncateString.js";

/* covers the styling and positioning of the well */
const StyledTwoOrFourCombinationWell = styled.div`
  border-radius: 50%;
  grid-row: ${(props) => props.row};
  grid-column: ${(props) => props.col};
  opacity: ${(props) => (props.lighten ? 0.2 : 1)};
  border-left-color: ${(props) => props.leftColor};
  border-top-color: ${(props) => props.topColor};
  border-right-color: ${(props) => props.rightColor};
  border-bottom-color: ${(props) => props.bottomColor};
  border-width: ${(props) => props.wellRad / 2}px;
  border-style: solid;
  height: 0px;
  width: 0px;
`;

/* covers the styling and positioning of the labels on 2 and 4 combination wells */
const StyledLabel = styled.div`
  display: flex;
  font-size: 12px;
  font-family:${props => props.theme.fonts.primary};
  font-weight: bold;
  color: #000;
  width: ${(props) => props.wellRad}px;
  position: relative;
  margin: auto;
  top: -7px;
  left: -20px;
  align-items: center;
  justify-content: center;
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
  width: ${(props) => props.wellRad}px;
  position: relative;
  margin: auto;
  top: -13px;
  left: -19px;
`;

/* covers the styling and positioning of the labels on 3-compound combinations */

const StyledThreeCombinationWell = styled.div`
  grid-row: ${(props) => props.row};
  grid-column: ${(props) => props.col};
  opacity: ${(props) => (props.lighten ? 0.2 : 1)};
  border-radius: 50%;
  background: conic-gradient(
    ${(props) => props.colorOne} 35%,
    ${(props) => props.colorTwo} 0 65%,
    ${(props) => props.colorThree} 0
  );
`;
const StyledLabel3 = styled.div`
  display: flex;
  font-size: 12px;
  font-family: "Roboto", sans-serif;
  font-weight: bold;
  color: #000;
  width: ${(props) => props.wellRad}px;
  height: ${(props) => props.wellRad}px;
  margin: auto;
  align-items: center;
  justify-content: center;
`;
const StyledColumn3 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.wellRad}px;
  height: ${(props) => props.wellRad}px;
`;


/**
 * Render the well on the plate of a combination compound (2,3 or 4)
 *
 * @param props.colors the colors of each compound that make up the combination
 * @param props.toggleState.selected name of selected compound, <empty_string> if none is selected
 * @param props.toggleState.well compounds if compounds to be highlighted, controls if controls to be highlighted otherwise "none"
 * @param props.toggleState.label "none" if no label should be displayed, otherwise "compound" / "concentration"
 * @param props.wellRad radius of well
 * @param props.row the row positioning of well
 * @param props.col the col positioning of well
 * @param cmpdObj the compound object 
 *        attrs of cmpdObj:
                CONCuM
                cmpdname
                cmpdnum
                plateID
                well
 */
const CombinationWell = (props) => {
  let colors = props.colors;
  let sizeColors = colors.length;

  let title = "";
  var lighten = false;
  if (props.toggleState.well !== "none") {
    if (props.toggleState.well === "controls") {
      lighten = true;
    }
  } else {
    if (
      props.toggleState.selected !== "" &&
      props.toggleState.selected !==
        props.cmpdObj.plateID + props.cmpdObj.cmpdname
    ) {
      lighten = true;
    }
  }
  title = props.cmpdObj.cmpdname + "\n" + props.cmpdObj.CONCuM;

  return sizeColors === 3 ? (
    <StyledThreeCombinationWell
      colorOne={colors[0]}
      colorTwo={colors[1]}
      colorThree={colors[2]}
      lighten={lighten}
      row={props.row}
      col={props.col}
      title={title}
      wellRad={props.wellRad}
    >
      {props.toggleState.label !== "none" ? (
        props.toggleState.label === "both" ? (
          <StyledColumn3 wellRad={props.wellRad}>
            <StyledColLabel>
              {truncateString(props.cmpdObj.cmpdname, 5)}
            </StyledColLabel>
            <StyledColLabel>
              {truncateString(props.cmpdObj.CONCuM, 5)}
            </StyledColLabel>
          </StyledColumn3>
        ) : (
          <StyledLabel3 wellRad={props.wellRad}>
            {props.toggleState.label === "compound"
              ? truncateString(props.cmpdObj.cmpdname, 5)
              : truncateString(props.cmpdObj.CONCuM, 5)}
          </StyledLabel3>
        )
      ) : (
        ""
      )}
    </StyledThreeCombinationWell>
  ) : (
    <StyledTwoOrFourCombinationWell
      leftColor={colors[0]}
      topColor={sizeColors === 2 ? colors[0] : colors[1]}
      rightColor={sizeColors === 2 ? colors[1] : colors[2]}
      bottomColor={sizeColors === 2 ? colors[1] : colors[3]}
      lighten={lighten}
      row={props.row}
      col={props.col}
      title={title}
      wellRad={props.wellRad}
    >
      {props.toggleState.label !== "none" ? (
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
    </StyledTwoOrFourCombinationWell>
  );
};

export default CombinationWell;
