import React from "react";
import styled from "styled-components";

const StyledUploadResultButton = styled.input`
  position: absolute;
  font-family: ${(props) => props.theme.fonts.primary};
  font-size: 14px;
  bottom: 15px;
  padding-left: 10px;
`;

const StyledErrorMessage = styled.p`
  font-size: 12px;
  color: red;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`;


// Make sure that the uploaded results-file is valid
const checkValidUpload = (jsonObj) => {
  return (
    jsonObj.hasOwnProperty("cols") &&
    jsonObj.hasOwnProperty("rows") &&
    jsonObj.hasOwnProperty("result") &&
    jsonObj.hasOwnProperty("sizeEmptyEdge") &&
    jsonObj.hasOwnProperty("controls")
  );
};


/**
 * Handles the upload of a result json file so that a user can bypass the tool and not run the experiment through the minizinc model 
 * to check the visualization of the plates
 * @param props.handleUploadedResults callback-func that updates data state in parent component by adding the info gotten from the results-json file
 * 
 * 
 */
const UploadResult = (props) => {
  const [showError, setShowError] = React.useState(false);
  const handleChange = (event) => {
    setShowError(false);
    const fr = new FileReader();
    fr.readAsText(event.target.files[0], "UTF-8");
    fr.onload = (event) => {
      let parsedResult = JSON.parse(event.target.result);
      if (checkValidUpload(parsedResult)) {
        props.handleUploadedResults(parsedResult);
      } else {
        setShowError(true);
      }
    };
  };

  return (
    <StyledContainer>
      <StyledUploadResultButton
        type="file"
        name="upload-results"
        id="upload-results"
        accept=".json"
        onChange={handleChange}
      />
      {showError ? (
        <StyledErrorMessage>
          Please upload the correct downloaded json file!
        </StyledErrorMessage>
      ) : undefined}
    </StyledContainer>
  );
};

export default UploadResult;
