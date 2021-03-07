import React from "react";
import styled from "styled-components";
import Well from "./Well.jsx";
import PlateSidebar from "./PlateSidebar.jsx";
import Switch from "./Switch.jsx";
import getAlphabet from "./../../functions/getAlphabet.js";

/* covers the positioning of the styledPlate and ColorLegend components in row fashion */
const StyledLayoutContainer = styled.div`
  margin: auto;
  margin-top: 2.5rem;
  margin-bottom: 2.5rem;
  display: flex;
  flex-direction: row;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`;

/* covers the styling and positioning of the plate and the row & column labels*/
const StyledPlateWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(
    ${(props) => props.cols + 2},
    ${(props) => props.wellRad}px
  );
  grid-template-rows: repeat(
    ${(props) => props.rows + 2},
    ${(props) => props.wellRad}px
  );
  column-gap: ${(props) => props.gap}px;
  row-gap: ${(props) => props.gap}px;
`;

/* covers the styling and positioning of the wells in the plate*/
const StyledPlate = styled.div`
  grid-area: 2/2 / ${(props) => props.rows} / ${(props) => props.cols};
  display: grid;
  grid-template-columns: repeat(
    ${(props) => props.cols},
    ${(props) => props.wellRad}px
  );
  grid-template-rows: repeat(
    ${(props) => props.rows},
    ${(props) => props.wellRad}px
  );
  width: ${(props) => props.cols * props.wellRad + props.cols * props.gap}px;
  height: ${(props) => props.rows * props.wellRad + props.rows * props.gap}px;
  column-gap: ${(props) => props.gap}px;
  row-gap: ${(props) => props.gap}px;
  border: solid 1px;
`;

/* The style and positioning of the column identifier */
const StyledColumnIdentifier = styled.div`
  justify-self: center;
  align-self: center;
  grid-row: ${(props) => props.row};
  grid-column: ${(props) => props.col};
`;

/* The style and positioning of the row identifier */
const StyledRowIdentifier = styled.div`
  justify-self: center;
  align-self: center;
  grid-row: ${(props) => props.row};
  grid-column: ${(props) => props.col};
`;

const EMPTY_WELL_COLOR = "#e9e9e9";

/**
 * Renders the plate (the row/col identifiers) and each corresponding well
 *
 * @param props.rowList a list containing an integer for every row
 * @param props.colList a list containing an integer for every column
 * @param props.rows the amount of rows specified in the form
 * @param props.cols the amount of cols specified in the form
 * @param props.data all cmpdObjs for the corresponding plate
 * @param props.plates all plates and their corresponding cmpdObjs
 * @param props.emptyEdges the amount of empty edges in the plate specified in the form
 * @param props.compoundMap the map maping a compound name to all cmpdObjs with the same name (sorted high to low conc)
 * @param props.compoundToColorMap maping cmpdObject.cmpdnum to the corresponding hsla color
 */
const Plate = (props) => {
  const wellRad = 40;
  /* used for the row identifier label */
  const alphabet = getAlphabet();
  const ref = useRef(null);

  const [selectedCompound, setSelectedCompound] = React.useState("");
  const handleSelectedCompound = (selected) => {
    if (selected === selectedCompound) {
      setSelectedCompound("");
    } else {
      setSelectedCompound(selected);
    }
  };

  var scroll = function (el) {
    el.scrollTop = 1;
    el.scrollTop = 0;
  }

  const [display, setDisplay] = React.useState("none");
  const handleDisplay = (selected) => {
    if (selected === display) {
      setDisplay("none");
    } else {
      setDisplay(selected);
    }
  };

  let emptyWells = [];

  for (let i = 1; i <= props.rows; i++) {
    for (let j = 1; j <= props.cols; j++) {
      emptyWells.push([i, j]);
    }
  }

  return (
    <StyledLayoutContainer>
      <StyledPlateWrapper
        rows={props.rows}
        cols={props.cols}
        wellRad={wellRad}
        gap={2.5}
      >
        {props.rowList.map((i) => {
          return React.createElement(
            StyledRowIdentifier,
            /* will there ever be the case where data[0] is undefined? */
            {
              key:
                "row-" + alphabet[i] +
                props.data[0].plateID,
              row: i + 2,
              col: 1,
            },
            props.rows > alphabet.length ? i + 1 : alphabet[i]
          );
        })}
        {props.colList.map((i) => {
          return React.createElement(
            StyledColumnIdentifier,
            /* will there ever be the case where data[0] is undefined? */
            { key: i + 1 + props.data[0].plateID, row: 1, col: i + 2 },
            i + 1
          );
        })}
        <StyledPlate
          rows={props.rows}
          cols={props.cols}
          wellRad={wellRad}
          gap={2.5}
        >
          {emptyWells.map((pos, index) => {
            // Fill whole plate with empty wells first
            return (
              <Well
                empty={true}
                row={pos[0]}
                col={pos[1]}
                key={"plate-" + index+1 +" "+ alphabet[pos[0] - 1] + pos[1]
                }
                color={EMPTY_WELL_COLOR} //grey
              />
            );
          })}
          {props.data.map((cmpdObj) => {
            /* attrs of cmpdObj:
                CONCuM
                cmpdname
                cmpdnum
                plateID
                well
            */
            let row = alphabet.indexOf(cmpdObj.well[0]) + 1;
            let col = parseInt(cmpdObj.well.slice(1, cmpdObj.well.length));
            return (
              <Well
                empty={false}
                selected={selectedCompound}
                wellRad={wellRad}
                display={display}
                row={row}
                col={col}
                key={cmpdObj.plateID + cmpdObj.well}
                cmpdObj={cmpdObj}
                color={props.compoundToColorMap.get(cmpdObj.cmpdnum)}
              />
            );
          })}
        </StyledPlate>
      </StyledPlateWrapper>
      <PlateSidebar
        compoundMap={props.compoundMap}
        compoundToColorMap={props.compoundToColorMap}
        handleSelectedCompound={handleSelectedCompound}
        plate={props.data}
        rows={props.rows}
      >
        <Switch handleDisplay={handleDisplay} />
      </PlateSidebar>
    </StyledLayoutContainer>
  );
};

export default Plate;
