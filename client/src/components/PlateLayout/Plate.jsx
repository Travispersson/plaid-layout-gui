import React from "react";
import styled from "styled-components";
import Well from "./Well.jsx";
import PlateSidebar from "./PlateSidebar.jsx";
import Switch from "./Switch.jsx";
import getAlphabet from "./../../functions/getAlphabet.js";
import { exportComponentAsPNG } from "react-component-export-image";
import { BiImage } from "react-icons/bi";
import findCombinations from "./../../functions/findCombinations.js";
import CombinationWell from "./CombinationWell";

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

const StyledColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledDownloadPngButton = styled.button`
  background: none;
  border: none;
  color: inherit;
  font: inherit;
  cursor: pointer;
  align-self: flex-end;
  justify-self: flex-end;
  display: flex;
  flex-direction: column;
  background-color: ${(props) =>
    props.theme.backgroundColors.downloadButtonBlue};
  align-items: flex-end;
  justify-content: flex-end;
  padding: 10px;
  margin: 10px;
  border-radius: 4px;
`;
const EMPTY_WELL_COLOR = "#e9e9e9";

/*
 * @returns the colors assigned to each compound of the combination (comboObj)
*/
const handleWellColorCombinations = (comboObj, compoundToColorMap) => {
  const cmpdName = comboObj.cmpdname;
  const combinations = findCombinations(cmpdName);
  let colors = [];
  for (let comp of combinations) {
    colors.push(compoundToColorMap.get(comp + "_" + comboObj.CONCuM));
  }
  return colors;
};

function toggleReducer(state, action) {
  switch (action.type) {
    case "label":
      if (action.payload === state.label) {
        return { ...state, label: "none" };
      } else {
        return { ...state, label: action.payload };
      }
    case "well":
      if (action.payload === state.label) {
        return { ...state, well: "none" };
      } else {
        return { ...state, well: action.payload, selected: "" };
      }
    case "selection":
      if (action.payload === state.selected) {
        return { ...state, selected: "" };
      } else {
        return { ...state, well: "none", selected: action.payload };
      }
    default:
      throw new Error(
        "Something went wrong when toggling between different labels/wells!"
      );
  }
}

/**
 * Renders the plate (the row/col identifiers) with each corresponding well and the sidebar / switch section
 * 
 * @param props.rowList a list containing an integer for every row
 * @param props.colList a list containing an integer for every column
 * @param props.rows the amount of rows specified in the form
 * @param props.cols the amount of cols specified in the form
 * @param props.data all cmpdObjs for the corresponding plate
 * @param props.controls contains the names of the control compounds
 * @param props.plates all plates and their corresponding cmpdObjs
 * @param props.compoundMap the map maping a compound name to all cmpdObjs with the same name (sorted high to low conc)
 * @param props.compoundToColorMap maping cmpdObject.cmpdnum to the corresponding hsla color
 */
const Plate = (props) => {
  const wellRad = 40;
  /* used for the row identifier label */
  const alphabet = getAlphabet();

  const [toggleState, toggleDispatch] = React.useReducer(toggleReducer, {
    label: "none",
    well: "none",
    selected: "",
  });


  /**
   * Functions for handling different selections on the plate
   * handleSelectedCompound -- clicking on a compound on the compound/combination sidebar list
   * handleToggleLabel     -- toggling between showing the compound name, concentration, both or nothing on each well
   * handleToggleWell      -- toggling between showing only the compounds, controls or both
   */
  const handleSelectedCompound = (selected) => {
    if (selected === toggleState.selected) {
      toggleDispatch({ type: "selection", payload: "" });
    } else {
      toggleDispatch({ type: "selection", payload: selected });
    }
  };

  const handleToggleLabel = (selected) => {
    if (selected === toggleState.label) {
      toggleDispatch({ type: "label", payload: "" });
    } else {
      toggleDispatch({ type: "label", payload: selected });
    }
  };

  const handleToggleWell = (selected) => {
    if (selected === toggleState.well) {
      toggleDispatch({ type: "well", payload: "" });
    } else {
      toggleDispatch({ type: "well", payload: selected });
    }
  };
 /******************************************************************/


  let emptyWells = [];

  for (let i = 1; i <= props.rows; i++) {
    for (let j = 1; j <= props.cols; j++) {
      emptyWells.push([i, j]);
    }
  }
  // used for downloading png file
  const componentRef = React.useRef();

  return (
    <StyledLayoutContainer>
      <StyledPlateWrapper
        rows={props.rows}
        cols={props.cols}
        wellRad={wellRad}
        gap={2.5}
        ref={componentRef}
      >
        {props.rowList.map((i) => {
          return React.createElement(
            StyledRowIdentifier,
            /* will there ever be the case where data[0] is undefined? */
            {
              key: "row-" + alphabet[i] + props.data[0].plateID,
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
                key={"plate-" + index + 1 + " " + alphabet[pos[0] - 1] + pos[1]}
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
            if (findCombinations(cmpdObj.cmpdname)) {
              const colors = handleWellColorCombinations(
                cmpdObj,
                props.compoundToColorMap
              );
              return (
                <CombinationWell
                  wellRad={wellRad}
                  toggleState = {toggleState}
                  row={row}
                  col={col}
                  key={cmpdObj.plateID + cmpdObj.well}
                  cmpdObj={cmpdObj}
                  colors={colors}
                />
              );
            } else {
              return (
                <Well
                  empty={false}
                  controls={props.controls}
                  toggleState = {toggleState}
                  wellRad={wellRad}
                  row={row}
                  col={col}
                  key={cmpdObj.plateID + cmpdObj.well}
                  cmpdObj={cmpdObj}
                  color={props.compoundToColorMap.get(cmpdObj.cmpdnum)}
                />
              );
            }
          })}
        </StyledPlate>
      </StyledPlateWrapper>
      <StyledColumn>
        <PlateSidebar
          compoundMap={props.compoundMap}
          compoundToColorMap={props.compoundToColorMap}
          handleSelectedCompound={handleSelectedCompound}
          rows={props.rows}
        >
          <Switch
            handleToggleLabel={handleToggleLabel}
            handleToggleWell={handleToggleWell}
            activeLabel={toggleState.label}
            activeWell={toggleState.well}
          />
        </PlateSidebar>
        <StyledDownloadPngButton
          title={"Download PNG of plate"}
          onClick={() =>
            exportComponentAsPNG(componentRef, { fileName: "plate.png" })
          }
        >
          <BiImage size={24} />
        </StyledDownloadPngButton>
      </StyledColumn>
    </StyledLayoutContainer>
  );
};

export default Plate;
