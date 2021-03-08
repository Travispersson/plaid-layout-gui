import React from "react";
import styled from "styled-components";
import FormPage from "./FormPage";
import InputDelimiter from "./Fields/InputDelimiter";
import ListGroupedCompounds from "./ListGroupedCompounds";
import parse from "../../functions/parse.js";
import FormButtons from "./FormButtons/FormButtons";
import useValidation from "./Validation/useValidation";
import utils, { hasErrors } from "./utils.js";
import InputTextArea from "./Fields/InputTextArea";

const StyledSectionLabel = styled.label`
  margin-bottom: 10px;
  margin-top: 10px;
  font-weight: bold;
  border-bottom: 1px solid black;
  font-size: 16px;
`;

const DEFAULT_DELIMITER = ",";

const setUpTheCompoundForm = (groupObj) => {
  let groups = groupObj.groups;
  let processedGroup;

  // will hold the replicates array and compound concentrations numbers from each group
  let utilGroup = {
    compoundConcentrations: [],
    compoundReplicates: [],
    compound_concentration_indicators: [],
  };

  let map = {};
  for (let i = 0; i < groups.length; i++) {
    let compoundGroup = groups[i];
    processedGroup = {
      compound_names: [],
      concentration_names: [],
      replicates: 0,
    };
    for (let key in compoundGroup) {
      switch (key) {
        case "compound_names_parsed":
          processedGroup.compound_names = compoundGroup.compound_names_parsed;
          break;
        case "compound_replicates":
          processedGroup.replicates = parseInt(
            compoundGroup.compound_replicates
          );
          break;
        case "concentration_names":
          processedGroup.concentration_names =
            compoundGroup.concentration_names_parsed;
          break;
        default:
          break;
      }
    }

    // fill the amount of concentrations and replicates for each compound
    let concAmount = processedGroup.concentration_names.length;
    for (let j = 0; j < processedGroup.compound_names.length; j++) {
      utilGroup.compoundConcentrations.push(concAmount);
      utilGroup.compoundReplicates.push(processedGroup.replicates);
    }

    /*
      create this hash map
     map = {compoundName : [concName, concName...]} 
     */
    for (let j = 0; j < processedGroup.compound_names.length; j++) {
      for (let k = 0; k < processedGroup.concentration_names.length; k++) {
        if (map[processedGroup.compound_names[j]] === undefined) {
          map[processedGroup.compound_names[j]] = [
            processedGroup.concentration_names[k],
          ];
        } else {
          map[processedGroup.compound_names[j]].push(
            processedGroup.concentration_names[k]
          );
        }
      }
    }
  }

  // TODO this is suposed to be removed from the model right?
  for (let j = 0; j < Math.max(...utilGroup.compoundConcentrations); j++) {
    utilGroup.compound_concentration_indicators.push("");
  }
  // the matrix
  let compoundConcentrationNames = [];
  // the dimensions of the matrix
  let cols = Math.max(...utilGroup.compoundConcentrations);
  // amount of keys in map  === amount of compounds == rows

  for (let key in map) {
    let row = [];
    for (let j = 0; j < cols; j++) {
      if (j > map[key].length - 1) {
        row.push("");
      } else {
        row.push(map[key][j]);
      }
    }
    compoundConcentrationNames.push(row);
  }

  // all the compound names
  const compoundNames = Object.keys(map);
  // amount of compounds
  const compounds = compoundNames.length;

  let compoundObject = {
    compound_names: compoundNames,
    compounds: compounds,
    compound_concentrations: utilGroup.compoundConcentrations,
    compound_concentration_names: compoundConcentrationNames,
    compound_replicates: utilGroup.compoundReplicates,
    compound_concentration_indicators:
      utilGroup.compound_concentration_indicators,
    groups: groupObj,
  };
  return compoundObject;
};

let combinationObject = {
  combinations: 0,
  combination_concentrations: 0,
  combination_names: [], // List
  combination_concentration_names: [], // List
}

const CompoundForm = ({
  compoundState,
  combinationState,
  handleNext,
  handlePrev,
  handleCompoundFormChange,
}) => {
  const [compoundForm, setCompoundForm] = React.useState(() =>
    setUpTheCompoundForm(compoundState.groups)
  );

  const [combinationForm, setCombinationForm]= React.useState(combinationState);

  const compoundConfig = {
    fields: {
      compound_replicates: {
        compReplicateSize: {
          value: compoundForm.groups,
          message: "Number of replicates must be a number > 0",
        },
      },
      compound_names: {
        compNameCount: {
          value: compoundForm.groups,
          message: "Compound names cannot be left empty",
        },
      },
      concentration_names: {
        concNameCount: {
          value: compoundForm.groups,
          message: "Concentration names cannot be left empty",
        },
      },
    },
  };

  const [errors, utils] = useValidation(compoundForm, compoundConfig);

  const [validating, setValidating] = React.useState(false);
  React.useEffect(() => {
    if (validating) {
      const compoundErrors = utils.onClick();
      if (!hasErrors(compoundErrors)) {
        let compoundObj = setUpTheCompoundForm(compoundForm.groups);
        handleCompoundFormChange(compoundObj);
        handleNext();
      }
      setValidating(false);
    }
  }, [validating]);

  const [delimiter, setDelimiter] = React.useState(
    compoundForm.groups.delimiter
      ? compoundForm.groups.delimiter
      : DEFAULT_DELIMITER
  );

  const handleCombinationChange = () => {

  }

  const handleDelimiterChange = (new_delimiter) => {
    // When the delimiter has changed => we need to re-parse the compound names that has been written to the field (if not empty)
    if (new_delimiter === "") {
      // We want to use the default delimiter if the user leaves the input field empty
      setDelimiter(DEFAULT_DELIMITER);
    } else {
      setDelimiter(new_delimiter);
    }

    let groups = compoundForm.groups;
    groups.delimiter = new_delimiter;
    for (let i in groups.groups) {
      if (groups.groups[i].compound_names !== "") {
        new_delimiter =
          new_delimiter !== "" ? new_delimiter : DEFAULT_DELIMITER;
        groups.groups[i].compound_names_parsed = parse(
          new_delimiter,
          groups.groups[i].compound_names
        );
      }
      if (groups.groups[i].compound_names !== "") {
        groups.groups[i].concentration_names_parsed = parse(
          new_delimiter,
          groups.groups[i].concentration_names
        );
      }
    }
    setCompoundForm({ ...compoundForm, groups: groups });
  };

  const handleChangeOnGroups = (groups, selected) => {
    if (groups === null) {
      setCompoundForm({
        ...compoundForm,
        groups: {
          delimiter: delimiter,
          selectedGroup: 0,
          groups: [
            {
              id: "gr-0",
              compound_names: "",
              compound_names_parsed: "",
              concentration_names: "",
              concentration_names_parsed: "",
              compound_replicates: 0,
            },
          ],
        },
      });
    } else {
      let newGroup = {
        groups: groups,
        selectedGroup: selected,
        delimiter: delimiter,
      };
      setCompoundForm({ ...compoundForm, groups: newGroup });
    }
  };

  /**
   * when we click next or previous we want to process the fields and set up the state object that we eventually want to send to the API
   * @param {string} action defines the action (next or previous button)
   */
  const onClick = (action) => {
    if (action === "next") {
      setValidating(true);
    } else {
      let compoundObj = setUpTheCompoundForm(compoundForm.groups);
      handleCompoundFormChange(compoundObj);
      handlePrev();
    }
  };

  return (
    <FormPage>
      <StyledSectionLabel>Compounds settings</StyledSectionLabel>
      <InputDelimiter
        label={"Delimiter selection (Optional)"}
        delimiter={delimiter}
        placeholder=""
        name="delimiter_selection"
        disable={false}
        onChange={handleDelimiterChange}
        errorMsg={null}
      />
      <StyledSectionLabel>Compounds</StyledSectionLabel>
      <ListGroupedCompounds
        delimiter={delimiter}
        handleChangeOnGroups={handleChangeOnGroups}
        groups={compoundForm.groups.groups}
        errors={errors}
        selectedGroup={compoundForm.groups.selectedGroup}
      />
      <InputTextArea
        label={"Compound combinations"} 
        name={"combination_names"}
        onChange={handleCombinationChange}
        value={""}
        disable={false}
        />
      <FormButtons
        step={1}
        onClickNext={() => onClick("next")}
        onClickPrev={() => onClick("prev")}
      />
    </FormPage>
  );
};

export default CompoundForm;
