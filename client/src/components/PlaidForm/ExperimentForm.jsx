import React, { useState } from "react";
import styled from "styled-components";
import FormPage from "./FormPage";
import InputNumber from "./Fields/InputNumber";
import InputSelect from "./Fields/InputSelect";
import InputCheck from "./Fields/InputCheck";

const StyledSectionLabel = styled.label`
  margin-bottom: 10px;
  margin-top: 10px;
  font-weight: bold;
`;

const ExperimentForm = ({ handleInputChange, state }) => {
  const [customState, setCustomState] = useState(false);
  const [selectState, setSelectState] = useState({
    value: "{num_row: 6, num_col: 8} ",
  });
  const [emptyState, setEmptyState] = useState(false);
  /* Input handler for the checkbox */
  const displaySize = (event) => {
    setSelectState({ value: event.target.value });
    if (event.target.value === "custom") {
      setCustomState(!customState);
    } else {
      handleInputChange(event);
      setCustomState(false);
    }
  };

  function inputHandler(event) {
    if (event.target.type === "checkbox") {
      setEmptyState(!emptyState);
      handleInputChange(event);
    } else {
      handleInputChange(event);
    }
  }
  return (
    <FormPage>
      <StyledSectionLabel>Plate dimensions</StyledSectionLabel>
      {/* TODO: Json-data must load with the values of the preselected value */}

      <InputSelect
        name="select_plate_size"
        id="size_options"
        value={selectState.value}
        onChange={displaySize}
        onfocus="this.selectedIndex = 1;"
        label={"Plate size"}
        errorMsg={null}
      >
        <option value='{"num_rows": 6, "num_cols": 8}'>48</option>
        <option value='{"num_rows": 8, "num_cols": 12}'>96</option>
        <option value='{"num_rows": 16, "num_cols": 24}'>384</option>
        <option value='{"num_rows": 32, "num_cols": 48}'>1536</option>
        <option value='{"num_rows": 48, "num_cols": 72}'>3456</option>
        <option value="custom">Custom size</option>
      </InputSelect>

      {customState === true ? (
        <>
          <InputNumber
            name="num_rows"
            label="Rows"
            value={state.num_rows ? state.num_rows : ""}
            onChange={inputHandler}
            errorMsg={null}
          />
          <InputNumber
            name="num_cols"
            label="Columns"
            value={state.num_cols ? state.num_cols : ""}
            onChange={inputHandler}
            errorMsg={null}
          />
        </>
      ) : null}
      <StyledSectionLabel>Cell line direction </StyledSectionLabel>
      <InputNumber
        label={"Vertical"}
        name="vertical_cell_lines"
        value={state.vertical_cell_lines ? state.vertical_cell_lines : ""}
        onChange={handleInputChange}
        errorMsg={null}
      />

      <InputNumber
        label={"Horizontal"}
        name="horizontal_cell_lines"
        value={state.horizontal_cell_lines ? state.horizontal_cell_lines : ""}
        onChange={handleInputChange}
        errorMsg={null}
      />
      <StyledSectionLabel>Constraints</StyledSectionLabel>
      <InputCheck
        label="Allow empty wells"
        onChange={inputHandler}
        name={"allow_empty_wells"}
        value={state.allow_empty_wells ? state.allow_empty_wells : false}
        errorMsg={null}
      />
      <InputNumber
        name="size_empty_edge"
        label="Size of empty edges"
        value={state.size_empty_edge ? state.size_empty_edge : ""}
        onChange={inputHandler}
        errorMsg={null}
      />
      <InputCheck
        label="concentrations_on_different_rows"
        onChange={handleInputChange}
        name={"concentrations on different rows"}
        value={
          state.concentrations_on_different_rows
            ? state.concentrations_on_different_rows
            : false
        }
        errorMsg={""}
      />
      <InputCheck
        label="concentrations_on_different_columns"
        onChange={handleInputChange}
        name={"concentrations on different columns"}
        value={
          state.concentrations_on_different_columns
            ? state.concentrations_on_different_columns
            : false
        }
        errorMsg={""}
      />
      <InputCheck
        label="replicates_on_different_plates"
        onChange={handleInputChange}
        name={"replicates on different plates"}
        value={
          state.replicates_on_different_plates
            ? state.replicates_on_different_plates
            : false
        }
        errorMsg={null}
      />
      <InputCheck
        label="replicates_on_same_plate"
        onChange={handleInputChange}
        name={"replicates on same plate"}
        value={
          state.replicates_on_same_plate
            ? state.replicates_on_same_plate
            : false
        }
        errorMsg={null}
      />
    </FormPage>
  );
};

export default ExperimentForm;
