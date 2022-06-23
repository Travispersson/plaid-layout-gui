import React, { useState } from "react";

import findCombinations from "../../../functions/findCombinations";
import removeParenthesisAndReturnSubCompound from "../../../functions/removeParenthesisAndReturnSubCompound";

/**
 * This object holds all the validator functions used by the useValidation hook. Each function specified in the supplied config matches the name of one or more validators in this object.
 * The config supplies an error message and a value to be compared against. If it passes the validation against that value, no error message is returned else return the error message.
 * */

const validators = {
  // Checks if field input is greater than some value
  minValidSize: function (config) {
    return function (value) {
      if (value < config.value || isNaN(value) || value === null) {
        return config.message;
      }
      return null;
    };
  },
  //checks if field input length is greater than some value
  minValidLength: function (config) {
    return function (value) {
      if (value.length !== config.value) {
        return config.message;
      }
      return null;
    };
  },
  //checks if the input is a number
  isNumber: function (config) {
    return function (value) {
      for (let i = 0; i < value.length; i++) {
        if (Number.isNaN(value[i])) {
          return config.message;
        }
      }
      return null;
    };
  },
  //checks if the max value of an array is less than some value
  maxNumber: function (config) {
    return function (value) {
      if (Array.isArray(value)) {
        if (config.value < Math.max(...value)) {
          return config.message;
        }
      } else {
        if (config.value < value) {
          return config.message;
        }
      }
      return null;
    };
  },
  //checks if another checkbox is already checked
  isAlsoChecked: function (config) {
    return function (value) {
      if (config.value === true && value === true) {
        return config.message;
      }
      return null;
    };
  },
  //checks if the concentration name count is empty
  concNameCount: function (config) {
    return function () {
      let groups = config.value.groups;
      for (let i = 0; i < groups.length; i++) {
        let group = groups[i];
        if (group.concentration_names.trim() === "") {
          return config.message;
        }
      }
      return null;
    };
  },
  //checks if the compound name count is empty
  compNameCount: function (config) {
    return function () {
      let groups = config.value.groups;
      for (let i = 0; i < groups.length; i++) {
        let group = groups[i];
        if (group.compound_names.trim() === "") {
          return config.message;
        }
      }
      return null;
    };
  },
  //checks if the number of compound replicates  are correct
  compReplicateSize: function (config) {
    return function () {
      let groups = config.value.groups;
      for (let i = 0; i < groups.length; i++) {
        let group = groups[i];
        if (parseInt(group.compound_replicates) < 1) {
          return config.message;
        }
      }
      return null;
    };
  },
  //checks if the number of control replicates are correct
  ctrlReplicateSize: function (config) {
    return function () {
      let groups = config.value.groups;
      for (let i = 0; i < groups.length; i++) {
        let group = groups[i];
        if (parseInt(group.control_replicates) < 0) {
          return config.message;
        }
      }
      return null;
    };
  },
  //checks if a replicate is specified given that a control name and concentration is specified
  ctrlNameAndReplCount: function (config) {
    return function () {
      let groups = config.value.groups;
      for (let i = 0; i < groups.length; i++) {
        let group = groups[i];
        if (
          group.control_names === "" &&
          group.concentration_names === "" &&
          parseInt(group.control_replicates) === 0
        ) {
          return null;
        }
        if (
          (group.control_names === "" ||
            group.concentration_names === "" ||
            (group.control_names !== "" && group.concentration_names !== "")) &&
          parseInt(group.control_replicates) < 1
        ) {
          return config.message;
        }
      }
      return null;
    };
  },
  //Checks if there is concentration specified for every control name
  ctrlNameEmptyConc: function (config) {
    return function () {
      let groups = config.value.groups;
      for (let i = 0; i < groups.length; i++) {
        let group = groups[i];
        if (group.control_names !== "" && group.concentration_names === "") {
          return config.message;
        }
      }
      return null;
    };
  },
  //Checks if there is a name specified for every control concentration
  ctrlConcEmptyName: function (config) {
    return function () {
      let groups = config.value.groups;
      for (let i = 0; i < groups.length; i++) {
        let group = groups[i];
        if (group.control_names === "" && group.concentration_names !== "") {
          return config.message;
        }
      }
      return null;
    };
  },
  //Checks if there are negative replicates 
  ctrlNegativeReplicates: function (config) {
    return function () {
      let groups = config.value.groups;
      for (let i = 0; i < groups.length; i++) {
        let group = groups[i];
        if (parseInt(group.control_replicates) < 0) {
          return config.message;
        }
      }
      return null;
    };
  },
  //Checks if the number of empty edges on the plate is correct
  maxEmptyEdgeSize: function (config) {
    return function (value) {
      const num_rows = config.value.num_rows;
      const num_cols = config.value.num_cols;
      const minVal = Math.min(num_rows, num_cols);
      if (value > Math.floor(minVal / 2)) {
        return config.message;
      }
      return null;
    };
  },
  /*  Checks if there are empty wells when there's not supposed to be and 
  and if there are enough wells to support the number of compounds, controls and replicates.*/
  wrongWellCount: function (config) {
    const experimentForm = config.value.experimentForm;
    const compoundForm = config.value.compoundForm;
    const controlForm = config.value.controlForm;
    return function () {
      let denom = 1;
      if (
        experimentForm.horizontal_cell_lines === 1 ||
        experimentForm.vertical_cell_lines === 1
      ) {
        denom = Math.max(
          experimentForm.horizontal_cell_lines,
          experimentForm.vertical_cell_lines
        );
      } else {
        denom =
          experimentForm.horizontal_cell_lines +
          experimentForm.vertical_cell_lines;
      }
      const numWells =
        (experimentForm.num_cols * experimentForm.num_rows) / denom;
      const amountEmptyWells =
        experimentForm.num_cols * experimentForm.size_empty_edge * 2 +
        (experimentForm.num_rows - experimentForm.size_empty_edge * 2) *
        experimentForm.size_empty_edge *
        2;

      //calculates the number of compound replicates and the number of concentrations needed on a plate
      let comp_res = 0
      for (let i in compoundForm.compound_replicates) {
        let num_repl = compoundForm.compound_replicates[i]
        let num_conc = compoundForm.compound_concentrations[i]
        comp_res += (num_repl * num_conc)

      }
      //calculates the number of control replicates and the number of concentrations needed on a plate
      let ctrl_res = 0
      for (let i in controlForm.control_replicates) {
        let num_repl = controlForm.control_replicates[i]
        let num_conc = controlForm.control_concentrations[i]
        ctrl_res += (num_repl * num_conc)
      }
      const wellsLeft =
        numWells - amountEmptyWells - comp_res - ctrl_res
      if (wellsLeft > 0 && !experimentForm.allow_empty_wells) {
        return config.message.hasEmptyWells;
      }
      return null;
    };
  },
  //Checks if there exists any duplicate compounds
  compDuplicates: function (config) {
    return function () {
      let groups = config.value.groups;
      let dupes = {};
      let mergedArrays = [];
      for (let i = 0; i < groups.length; i++) {
        mergedArrays = mergedArrays.concat(groups[i].compound_names_parsed);
      }

      for (let i = 0; i < mergedArrays.length; i++) {
        let subCompounds = removeParenthesisAndReturnSubCompound(
          mergedArrays[i].trim()
        );

        if (subCompounds !== null) {
          if (subCompounds.length === 1) {
            if (dupes[subCompounds[0]] === undefined) {
              dupes["(" + subCompounds[0] + ")"] = 1;
              dupes[subCompounds[0]] = 1;
            } else {
              dupes["(" + subCompounds[0] + ")"] =
                dupes["(" + subCompounds[0] + ")"] + 1;
              dupes[subCompounds[0]] = dupes[subCompounds[0]] + 1;
            }
          }
        }
      }
      let dupeStr = [];
      for (const compound in dupes) {
        if (dupes[compound] > 1) {
          dupeStr.push(compound);
        }
      }
      if (dupeStr.length > 0) {
        dupeStr = dupeStr.join(", ");
        return config.message + `${dupeStr}`;
      }
      return null;
    };
  },
  // Check if there exists any duplicate combinations
  combinationDuplicates: function (config) {
    return function () {
      let dupes = {};
      let groups = config.value.groups;
      let mergedArrays = [];
      for (let i = 0; i < groups.length; i++) {
        mergedArrays = mergedArrays.concat(groups[i].compound_names_parsed);
      }
      for (let i = 0; i < mergedArrays.length; i++) {
        let combos = findCombinations(mergedArrays[i].trim());

        if (combos !== null) {

          if (new Set(combos).size !== combos.length) {
            return config.message;
          }

          // makes sure that we consider permutations of combinations eg. (a)(b) == (b)(a) so if it contains both then we have a duplicate
          combos.sort();
          let combination = combos.toString().replaceAll(",", "");
          if (dupes[combination] === undefined) {
            dupes[combination] = 1;
          } else {
            dupes[combination] = dupes[combination] + 1;
          }
        }
      }
      for (const combo in dupes) {
        if (dupes[combo] > 1) {
          return "There exists duplicate combinations!";
        }
      }

      return null;
    };
  },
  // Check if there exists any duplicate controls
  ctrlDuplicates: function (config) {
    return function () {
      let groups = config.value.groups;
      let dupes = {};
      let mergedArrays = [];
      for (let i = 0; i < groups.length; i++) {
        mergedArrays = mergedArrays.concat(groups[i].control_names_parsed);
      }
      for (let i = 0; i < mergedArrays.length; i++) {
        let subCompounds = removeParenthesisAndReturnSubCompound(
          mergedArrays[i].trim()
        );
        if (subCompounds !== null) {
          if (dupes[subCompounds[0]] === undefined) {
            dupes["(" + subCompounds[0] + ")"] = 1;
            dupes[subCompounds[0]] = 1;
          } else {
            dupes["(" + subCompounds[0] + ")"] =
              dupes["(" + subCompounds[0] + ")"] + 1;
            dupes[subCompounds[0]] = dupes[subCompounds[0]] + 1;
          }
        }
      }

      let dupeStr = [];
      for (const compound in dupes) {
        if (dupes[compound] > 1) {
          dupeStr.push(compound);
        }
      }
      if (dupeStr.length > 0) {
        dupeStr = dupeStr.join(", ");
        return config.message + `${dupeStr}`;
      }
      return null;
    };
  },
  // Check if the combination folows a valid format
  isCombination: function (config) {
    return function () {
      const groups = config.value.groups;
      let mergedArrays = [];
      const regex = RegExp(/^(?<!.)[\s\t]*(\([^\(\)\s\t]+\)){1,4}[\s\t]*(?=$)/);
      for (let i = 0; i < groups.length; i++) {
        mergedArrays = mergedArrays.concat(groups[i].compound_names_parsed);
      }
      for (let i = 0; i < mergedArrays.length; i++) {
        let str = mergedArrays[i];
        if (str.includes("(") || str.includes(")")) {
          if (!regex.test(str)) {
            return config.message;
          }
        }
      }
      return null;
    };
  },
  // Check if the control follows a valid format
  isControl: function (config) {
    return function () {
      const groups = config.value.groups;
      let mergedArrays = [];
      const regex = RegExp(/^(?<!.)[\s\t]*(\([^\(\)\s\t]+\)){1}[\s\t]*(?=$)/);
      for (let i = 0; i < groups.length; i++) {
        mergedArrays = mergedArrays.concat(groups[i].control_names_parsed);
      }
      for (let i = 0; i < mergedArrays.length; i++) {
        let str = mergedArrays[i];
        if (str.includes("(") || str.includes(")")) {
          if (!regex.test(str)) {
            return config.message;
          }
        }
      }
      return null;
    };
  },
};

/**
 * Iterates through the field values, calling all validators that were specified in the fieldConfig. Any error messages are then propagated back.
 * @param fieldValue the field values to be validated
 * @param fieldConfig an object of all validator functions for the current field being validated
 * @param fieldStates the config for all of the fields
 * @return the errors from calling the validator functions
*/
function validateField(fieldValue, fieldConfig, fieldStates) {
  for (let validatorName in fieldConfig) {
    const validatorConfig = fieldConfig[validatorName];
    //select the correct validator based on the one specified in the config
    const validator = validators[validatorName];
    //run the validator function, returning the inner validator function.
    const configuredValidator = validator(validatorConfig);
    //run the inner validator function, returning ny errorMessages.
    const errorMessage = configuredValidator(fieldValue, fieldStates);
    if (errorMessage) {
      return errorMessage;
    }
  }
  return null;
}


/**
 * Iterates through all fields in the passed config (e.g num_rows and num_cols), creating an object fieldConfig which contains all validator functions for that field.
 * We also select the current input field value (e.g value of num_rows) and validate them.
 * @param fieldValues the input field values
 * @param fieldStates the config for all of the fields
 * @return an object of errors if any were found, else an empty object
*/
function validateFields(fieldValues, fieldStates) {
  const errors = {};
  for (let fieldName in fieldStates) {
    //get the values stored in key e.g num_rows.
    const fieldConfig = fieldStates[fieldName];
    //  const fieldValue = fieldValues[fieldName]; //get the current values found in our large object for num_rows.
    const fieldValue = fieldValues[fieldName];

    errors[fieldName] = validateField(fieldValue, fieldConfig, fieldStates); // pass the current value and the field into the validator. Return any errors.
    // These errors will then be displayed in the frontend.
  }
  return errors;
}
/** 
 * This function specfically validates the submit functionality.
 * @param submitConfig the validation functions to be run for the useValidation hook
 * @return the errors found when running the submit validation
*/
function validateSubmit(submitConfig) {
  const errors = {};
  for (let validatorName in submitConfig) {
    const validatorConfig = submitConfig[validatorName];
    const validator = validators[validatorName];
    const configuredValidator = validator(validatorConfig);
    errors[validatorName] = configuredValidator();
  }
  return errors;
}

/** 
 * Creates a custom validation hook that validates all validator functions specified in a validator object.
 * The hook relies on three fundamental features: The input to the input fields, the validation functions and the configuration specifying which validation functions to run for
 * that specific hook. The hook currently validates through the utility function onClick, validation by calling formUtils.onClick(), instantly validating everything according to the config.
 * 
 * @param input the values of the input fields that are passed to the validation functions
 * @param config the validation functions to be run for the useValidation hook
 * @param func a custom function that is to be applied to all input data before passing. Must match the
 * @return An array that can be deconstructed into current errors and all utility functions 
*/

const useValidation = (input = {}, config, func = null) => {
  const [errors, setErrors] = useState({});
  const formUtils = {
    /**
     * This function immediately validates the current config and input, returning any errors found.
     * */
    onClick: () => {
      if (func) {
        input = func(input);
      }
      const submitErrors = validateSubmit(config.submit);
      const fieldErrors = validateFields(input, config.fields);
      setErrors({ ...fieldErrors, ...submitErrors });
      return { ...fieldErrors, ...submitErrors };
    },
  };
  return [errors, formUtils];
};

export default useValidation;
