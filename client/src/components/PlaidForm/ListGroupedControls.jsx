import React from "react";
import styled from "styled-components";
import { BiPlus } from "react-icons/bi";
import { RiDeleteBin2Line } from "react-icons/ri";
import InputTextArea from "./Fields/InputTextArea";
import InputNumber from "./Fields/InputNumber";
import FormPage from "./FormPage";
import parse from "../../functions/parse.js";
import HoverInfo from "../HoverInfo/HoverInfo";

const StyledSelect = styled.select`
  margin: 5px;
  margin-left: 20px;
  min-width: 100px;
  height: 28px;
  border-radius: 7px;
  border: 1px solid #ccc;
  font-size: 14px;
  option {
    color: black;
    background: white;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
  }
  &:focus {
    outline: none;
    border: 2px solid #5096ff;
  }
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Ctitle%3Edown-arrow%3C%2Ftitle%3E%3Cg%20fill%3D%22%23000000%22%3E%3Cpath%20d%3D%22M10.293%2C3.293%2C6%2C7.586%2C1.707%2C3.293A1%2C1%2C0%2C0%2C0%2C.293%2C4.707l5%2C5a1%2C1%2C0%2C0%2C0%2C1.414%2C0l5-5a1%2C1%2C0%2C1%2C0-1.414-1.414Z%22%20fill%3D%22%23000000%22%3E%3C%2Fpath%3E%3C%2Fg%3E%3C%2Fsvg%3E");
  background-size: 0.6em;
  background-position: calc(100% - 0.8em) center;
  background-repeat: no-repeat;
`;

const StyledButton = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  margin-left: 5px;
  align-self: center;
`;

const StyledRowContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  align-self: end;
`;

const ListGroupedControls = ({
  groups,
  errors,
  handleChangeOnGroups,
  selectedGroup,
  delimiter,
}) => {
  const handleOnGroupClick = (event) => {
    handleChangeOnGroups(groups, event.target.value);
  };

  const handleOnAddButtonClick = (event) => {
    event.preventDefault();
    let newId = "gr-" + groups.length;
    let newObj = {
      id: newId,
      control_names: "",
      control_names_parsed: "",
      concentration_names: "",
      concentration_names_parsed: "",
      control_replicates: 0,
    };
    let items = groups;
    items.push(newObj);

    // handle change in groups and focus on the newly added group
    handleChangeOnGroups(items, items.length - 1);
  };

  const handleOnRemoveButtonClick = (event) => {
    event.preventDefault();
    let items = [...groups];
    if (items.length === 1) {
      handleChangeOnGroups(null, 0);
    } else {
      items.splice(selectedGroup, 1);

      //update ids
      for (var i = 0; i < items.length; i++) {
        items[i].id = "gr-" + i;
      }
      //handle the updated group list and refocus on the first group after removing a group
      handleChangeOnGroups(items, items.length - 1);
    }
  };

  const handleOnInputChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    let items = [...groups];
    let item;
    if (name === "control_names") {
      item = {
        ...items[selectedGroup],
        control_names: value,
        control_names_parsed: parse(delimiter, value),
      };
    } else if (name === "concentration_names") {
      item = {
        ...items[selectedGroup],
        concentration_names: value,
        concentration_names_parsed: parse(delimiter, value),
      };
    } else {
      item = {
        ...items[selectedGroup],
        [name]: value,
      };
    }

    // need to update the list aswell
    items[selectedGroup] = item;

    handleChangeOnGroups(items, selectedGroup);
  };
  return (
    <FormPage>
      <StyledRowContainer>
      <HoverInfo>
      Groups allow you to associate a set of controls with their corresponding concentrations and replicates.
      You can add more groups by pressing the ' + ' icon. 
      </HoverInfo>
        <StyledSelect
          id="select_group"
          name="select_group"
          value={selectedGroup}
          onChange={(event) => {
            handleOnGroupClick(event);
          }}
        >
          {groups.map((obj, index) => {
            return (
              <option id={obj.id} key={obj.id} value={index}>
                {"Group " + (index + 1)}
              </option>
            );
          })}
        </StyledSelect>
        <StyledButton title="Add new group" onClick={handleOnAddButtonClick}>
          <BiPlus size={18} />
        </StyledButton>
        <StyledButton
          title="Remove selected group"
          onClick={handleOnRemoveButtonClick}
        >
          <RiDeleteBin2Line size={18} />
        </StyledButton>
      </StyledRowContainer>
      <InputTextArea
        label={"Control names"}
        placeholder=""
        name="control_names"
        onChange={handleOnInputChange}
        value={groups[selectedGroup].control_names}
        disable={false}
        errorMsg={errors.control_names ? errors.control_names : null}
      />
      <InputTextArea
        label={"Concentration names"}
        placeholder=""
        name="concentration_names"
        onChange={handleOnInputChange}
        value={groups[selectedGroup].concentration_names}
        disable={false}
        errorMsg={
          errors.concentration_names ? errors.concentration_names : null
        }
      />
      <InputNumber
        label={"Replicates"}
        name="control_replicates"
        onChange={handleOnInputChange}
        value={groups[selectedGroup].control_replicates}
        errorMsg={errors.control_replicates ? errors.control_replicates : null}
      />
    </FormPage>
  );
};

export default ListGroupedControls;
