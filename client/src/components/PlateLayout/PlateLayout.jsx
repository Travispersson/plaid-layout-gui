import React from "react";
import styled from "styled-components";
import Plate from "./Plate.jsx";
import generateHslHues from "./../../functions/generateHslHues.js";
import { compareConcum } from "./../../functions/compareConcum.js";
import DownloadButton from "./DownloadButton";
import findCombinations from "./../../functions/findCombinations.js";

/* Styling of the main container of this component */
const StyledPlateContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow-y: scroll;
`;

const StyledDownloadButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

/* 
  Assign hsla colors to compound depending on concentration (conc)
  Each compound has the same base color -> different conc level means different shade
*/
const assignColorToCompound = (concs, hue, compoundToColorMap, cmpname) => {
  let i = 0;
  for (let o of concs) {
    const combinations = findCombinations(o.cmpdname);
    let compdnum = o.cmpdnum;
    if (combinations) {
      // assuming that cmpdname and concum is always separated with a '_'
      compdnum = cmpname + "_" + o.CONCuM;
    }
    /* concs are sorted high to low */
    if (compoundToColorMap.has(compdnum)) {
      /* We have already assigned color to that particular compound and its concentration */
      continue;
    } else {
      compoundToColorMap.set(
        compdnum,
        i === 0
          ? /*  tweak colors here if needed!! */
            `hsla(${hue},${70}%,${40}%,0.84)`
          : `hsla(${hue},${100}%,${40 + (i / 2) * 5}%,0.90)`
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
 * @param props.controls the names of the controls
 * @param props.sizeEmptyEdge the amount of empty edges in the plate specified in the form
 */
const PlateLayout = (props) => {
  /* Constructing rowList and colList to map over in Plate component*/
  /* There is no way to use a loop in JSX hence this "hack" */
  let rowList = [];
  let colList = [];
  for (let i = 0; i < props.rows; i++) {
    rowList.push(i);
  }
  for (let i = 0; i < props.cols; i++) {
    colList.push(i);
  }


  // separate compounds into their corresponding plate
  let plates = {};
  for (let i = 0; i < props.data.length; i++) {
    if (plates[props.data[i].plateID]) {
      plates[props.data[i].plateID] = [
        ...plates[props.data[i].plateID],
        props.data[i],
      ];
    } else {
      plates[props.data[i].plateID] = [props.data[i]];
    }
  }
  plates = Object.values(plates);


  // initialize arrays
  let mightNotExistAsSinglesOnPlate = []; // 
  let amountOfCombinationsPerPlate = [];
  for (let _ of plates) {
    amountOfCombinationsPerPlate.push(0);
    mightNotExistAsSinglesOnPlate.push([]);
  }
  // will contain a Map with key=compound and val=[concentrations] for all compounds on each plate
  let listOfCompoundMaps = [];
  // index into the plate currently being worked on
  let j = 0;

  for (let plate of plates) {
    /* map each compound name to all its corresponding concentrations */
    let compoundMap = new Map();
    for (let o of plate) {
      let combinations = findCombinations(o.cmpdname);
      if (combinations) {
        // here we add all compounds that make up the combination
        for (let comp of combinations) {
          // The compounds that make up the combination might not exist by itself on the plate so we add those to a separate array
          // and check them later on since they might have to be deleted
          mightNotExistAsSinglesOnPlate[j].push(comp);
          let val = compoundMap.get(comp);
          // if the compound "comp" does not exist in the plate as a single compound, then we need to create the compound obj
          // OBS! this assumes that cmpdnum is the compound name and concentration name separated by "_"
          let newObj = { ...o, cmpdname: comp, cmpdnum: comp + "_" + o.CONCuM };
          if (val !== undefined) {
            compoundMap.set(comp, [...val, newObj]);
          } else {
            compoundMap.set(comp, [newObj]);
          }
        }
        // here we add the combination itself
        let val = compoundMap.get(o.cmpdname);
        if (val !== undefined) {
          compoundMap.set(o.cmpdname, [...val, o]);
        } else {
          compoundMap.set(o.cmpdname, [o]);
          // increase amount of combinations in each plate only on a new combination
          amountOfCombinationsPerPlate[j]++;
        }
      } else {
        //if it's not a combination we just add the 
        let val = compoundMap.get(o.cmpdname);
        if (val !== undefined) {
          compoundMap.set(o.cmpdname, [...val, o]);
        } else {
          compoundMap.set(o.cmpdname, [o]);
        }
      }
    }

    /* sort all values (concentration) for each key in compoundMaå */
    for (let [cmp, vals] of compoundMap) {
      vals.sort(compareConcum);
      compoundMap.set(cmp, vals);
    }
    listOfCompoundMaps.push(compoundMap);
    j += 1;
  }


  j = 0;

  /* 
    Assign a color for each compound/combination and store them in listOfCompoundToColorMaps
    -- each map corresponds to the colors assigned to each compound for every plate
  */
  let listOfCompoundToColorMaps = [];
  for (let compoundMap of listOfCompoundMaps) {
    let compoundToColorMap = new Map();
    let colors = generateHslHues(
      compoundMap.size - amountOfCombinationsPerPlate[j]
    );
    let i = 0;
    for (let entry of compoundMap) {
      if (findCombinations(entry[0]) === null) {
        assignColorToCompound(
          entry[1],
          colors[i],
          compoundToColorMap,
          entry[0]
        );
        i++;
      }
    }
    listOfCompoundToColorMaps.push(compoundToColorMap);
    j += 1;
  }

  /* 
    remove compounds from each compoundMap that actually doesn't exist on plate, since each compound that make up a combination does not
    have to exist on the plate by itself
  */
  for (let compounds of mightNotExistAsSinglesOnPlate) {
    let i = 0;
    for (let compound of compounds) {
      let exist = false;
      for (let o of plates[i]) {

        if (o.cmpdname === compound) {
          exist = true;
          break;
        }
      }
      if(!exist){
        listOfCompoundMaps[i].delete(compound);
      }
    }
  }
  return (
    <StyledPlateContainer>
      <StyledDownloadButtonContainer>
        <DownloadButton plates={plates} type={"csv"} />
        <DownloadButton
          plates={plates}
          data={props.data}
          rows={props.rows}
          cols={props.cols}
          controls={props.controls}
          sizeEmptyEdge={props.sizeEmptyEdge}
          type={"json"}
        />
      </StyledDownloadButtonContainer>
      {plates.map((data, index) => {
        return (
          <Plate
            key={data[0].plateID}
            rowList={rowList}
            colList={colList}
            rows={props.rows}
            cols={props.cols}
            data={data}
            controls ={props.controls}
            plates={plates}
            compoundMap={listOfCompoundMaps[index]}
            compoundToColorMap={listOfCompoundToColorMaps[index]}
          />
        );
      })}
    </StyledPlateContainer>
  );
};

export default PlateLayout;
