import React from "react";
import styled from "styled-components";
import parse from "../../functions/parse.js";

const StyledUploadResultButton = styled.input`
  font-family: ${(props) => props.theme.fonts.primary};
  font-size: 14px;
  padding-left: 10px;
`;

const StyledErrorMessage = styled.p`
  font-size: 12px;
  color: red;
`;

const StyledContainer = styled.div`
  align-self: center;
  display: flex;
  flex-direction: column;
`;

/* return an object containing the properties num_rows , num_cols and size_empty_edge from the dzn file which are needed for the visualization */
const parseDznInput = (data) => {
  let stored = { rows: null, cols: null, sizeEmptyEdge: null, controls:null };
  for (const line of data.split(/[\r\n]+/)) {
    if (stored.rows && stored.cols && stored.sizeEmptyEdge && stored.controls) {
      break;
    }

    if (line.trim().includes("num_rows =")) {
      if (line[0] !== "%") {
        //its not a minizinc comment
        let rows = line.split("=");
        stored.rows = parseInt(rows[1].split(";", 1)[0].trim());
      }
      continue;
    }
    if (line.trim().includes("num_cols =")) {
      if (line[0] !== "%") {
        //its not a minizinc comment
        let cols = line.split("=");
        stored.cols = parseInt(cols[1].split(";", 1)[0].trim());
      }
      continue;
    }
    if (line.trim().includes("size_empty_edge =")) {
      if (line[0] !== "%") {
        //its not a minizinc comment
        let sizeEmptyEdge = line.split("=");
        stored.sizeEmptyEdge = parseInt(
          sizeEmptyEdge[1].split(";", 1)[0].trim()
        );
      }
      continue;
    }
    if(line.trim().includes("control_names")){

      if(line[0] !== "%"){
        //its not a minizinc comment
        let controlNames = line.split("=")[1];
        controlNames = JSON.parse(controlNames.split(";",1)[0].trim());
        stored.controls = controlNames;
      }
      continue;
    }
  }
  return stored;
};

/* these are from the formState object and represents each input field available in the forms */
const validProperties = [
  "experimentForm",
  "compoundForm",
  "controlForm",
  "delimiterCompounds",
  "delimiterControls",
];

/* makes sure that the uploaded json content only has allowed property names */
const validateJsonProperties = (jsonObj) => {
  for (let key in jsonObj) {
    if (!validProperties.includes(key)) {
      return false;
    }
  }
  return true;
};


// Handles the parameters contained in a json config file
const prepareConfigFile = (obj) => {
  let compoundGroups = obj.compoundForm.groups;
  let controlGroups = obj.controlForm.groups;

  /* add appropriate IDs and other properties needed for the forms */
  for (let i = 0; i < compoundGroups.length; i++) {
    let group = compoundGroups[i];
    group["id"] = "gr-" + i;

    group["compound_names_parsed"] = parse(
      obj.delimiterCompounds ? obj.delimiterCompounds : ",",
      group.compound_names
    );

    group["concentration_names_parsed"] = parse(
      obj.delimiterCompounds ? obj.delimiterCompounds : ",",
      group.concentration_names
    );
    compoundGroups[i] = group;
  }

  /* add appropriate IDs and other properties needed for the forms */
  for (let i = 0; i < controlGroups.length; i++) {
    let group = controlGroups[i];
    group["id"] = "gr-" + i;

    group["control_names_parsed"] = parse(
      obj.delimiterControls ? obj.delimiterControls : ",",
      group.control_names
    );
    group["concentration_names_parsed"] = parse(      obj.delimiterControls ? obj.delimiterControls : ",",
    group.concentration_names);
    controlGroups[i] = group;
  }

  let result = {
    experimentForm: obj.experimentForm,
    controlForm: {
      groups: [...controlGroups],
      selectedGroup: 0,
      delimiter: obj.delimiterControls ? obj.delimiterControls : ",",
    },
    compoundForm: {
      groups: [...compoundGroups],
      selectedGroup: 0,
      delimiter: obj.delimiterCompounds ? obj.delimiterCompounds : ",",
    },
  };
  return result;
};
/**
 * Handles the upload of a config json file and makes sure to construct an object that is used by the forms to fill them in.
 * Also handles the upload of a dzn file to bypass the form and send its content to the API
 * @param props.handleUploadedDznFile callback-func that sends the uploaded dzn file contents to the API and wait for the result
 * @param props.handleUploadedJsonConfig callback-func that makes sure that the parameters uploaded by the config file is sent to the right component to fill in the forms
 * 
 * 
 */
const UploadExperiment = (props) => {

  const [error, setShowError] = React.useState({ show: false, message: "" });


  // Handles the upload of a json/dzn file
  const handleChange = (event) => {
    let extension = event.target.files[0].name.split(".").pop().toLowerCase();

    const fr = new FileReader();
    fr.readAsText(event.target.files[0], "UTF-8");
    fr.onload = (event) => {
      if (extension === "dzn") {
        let content = event.target.result;
        let parsedDataNeededForVisualization = parseDznInput(content);
        props.handleUploadedDznFile(parsedDataNeededForVisualization, content);
        return;
      }
      if (extension === "json") {
        let content = JSON.parse(event.target.result);
        if (validateJsonProperties(content)) {
          content = prepareConfigFile(content);
          props.handleUploadedJsonConfig(content);
        } else {
          setShowError({
            ...error,
            show: true,
            message: "The uploaded json file contains properties not allowed.",
          });
        }
      }
    };
  };

  return (
    <StyledContainer>
      <StyledUploadResultButton
        type="file"
        name="upload-exp"
        id="upload-exp"
        accept=".dzn,.json"
        onChange={handleChange}
      />
      {error.show ? (
        <StyledErrorMessage>{error.message}</StyledErrorMessage>
      ) : undefined}
    </StyledContainer>
  );
};

export default UploadExperiment;
