import React from "react";
import styled from "styled-components";
import Plate from "./Plate.jsx";
import generateHslHues from "./../../functions/generateHslHues.js";
import {
  compareConcum,
  concentrationsLabels,
} from "./../../functions/compareConcum.js";
import DownloadResultJson from "./DownloadResultJson.jsx";
import FixedDownloadButton from "./FixedDownloadButton";

/* Styling of the main container of this component */
const StyledPlateContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow-y: scroll;
`;

/* 
  Assign hsla colors to compound depending on concentration (conc)
  Each compound has the same base color -> different conc level means different shade
*/
const assignColorToCompound = (concs, hue, compoundToColorMap) => {
  let i = 0;
  for (let o of concs) {
    /* concs are sorted high to low */
    if (compoundToColorMap.has(o.cmpdnum)) {
      /* We have already assigned color to that particular compound and its concentration */
      continue;
    } else {
      compoundToColorMap.set(
        o.cmpdnum,
        i === 0
          ? /*  tweak colors here if needed */
          `hsla(${hue},${95}%,${41}%,0.74)`
          : `hsla(${hue},${100}%,${57 +
          i *
          (concentrationsLabels.includes(o.CONCuM) && o.CONCuM === "L"
            ? 10
            : 4)
          }%,0.90)`
      );
      i++;
    }
  }
};

/**
 * Renders the container that holds the (or all) resulting plates.
 *
 * @param props.data contains the output from the minizinc model
 * @param props.rows the amount of rows specified in the form
 * @param props.cols the amount of cols specified in the form
 * @param props.sizeEmptyEdge the amount of empty edges in the plate specified in the form
 */
const PlateLayout = (props) => {
  console.log(props.data)
  /* rowList, colList used to map over in the return as to render each component */
  /* There is no way to use a loop in JSX hence this "hack" */
  let rowList = [];
  let colList = [];
  for (let i = 0; i < props.rows; i++) {
    rowList.push(i);
  }
  for (let i = 0; i < props.cols; i++) {
    colList.push(i);
  }

  /* emptyWells  */
  const amountEmptyWells =
    props.cols * props.sizeEmptyEdge * 2 +
    (props.rows - props.sizeEmptyEdge * 2) * props.sizeEmptyEdge * 2;

  /* separate all data by corresponding plate */
  let plates = [];
  for (
    let i = 0;
    i < props.data.length;
    i += props.rows * props.cols - amountEmptyWells
  ) {
    plates.push(
      props.data.slice(i, i + props.rows * props.cols - amountEmptyWells)
    );
  }

  let listOfCompoundMaps = [];

  for (let plate of plates) {
    let compoundMap = new Map();
    /* map each compound name to all its corresponding concentrations */
    for (let o of plate) {
      let val = compoundMap.get(o.cmpdname);
      if (val !== undefined) {
        compoundMap.set(o.cmpdname, [...val, o]);
      } else {
        compoundMap.set(o.cmpdname, [o]);
      }
    }

    /* sort each compound from high to low concentration */
    for (let [cmp, vals] of compoundMap) {
      vals.sort(compareConcum);
      compoundMap.set(cmp, vals);
    }
    listOfCompoundMaps.push(compoundMap);
  }

  let listOfCompoundToColorMaps = [];
  /* Assign color for each compound */
  for (let compoundMap of listOfCompoundMaps) {
    let compoundToColorMap = new Map();
    let colors = generateHslHues(compoundMap.size);
    let i = 0;
    for (let entry of compoundMap) {
      assignColorToCompound(entry[1], colors[i], compoundToColorMap);
      i++;
    }
    listOfCompoundToColorMaps.push(compoundToColorMap);
  }

  return (
    <StyledPlateContainer>
      <DownloadResultJson
        data={props.data}
        rows={props.rows}
        cols={props.cols}
        sizeEmptyEdge={props.sizeEmptyEdge}
      />
      {plates.map((data, index) => {
        return (
          <Plate
            key={data[0].plateID}
            rowList={rowList}
            colList={colList}
            rows={props.rows}
            cols={props.cols}
            data={data}
            plates={plates}
            emptyEdges={props.sizeEmptyEdge}
            compoundMap={listOfCompoundMaps[index]}
            compoundToColorMap={listOfCompoundToColorMaps[index]}
          />
        );
      })}
        <FixedDownloadButton plates={plates} />
  
    </StyledPlateContainer>
  );
};

export default PlateLayout;
