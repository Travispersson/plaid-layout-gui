import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PlateLayout from "./../PlateLayout";
import TransitionPage from "./TransitionPage.jsx";
import Loader from "./../Loader";
import {config} from "../../Constants.js" // dev/prod variables

const StyledToolWrapper = styled.div`
  height: 100vh;
`;

const axios = require("axios");
var CancelToken = axios.CancelToken;
var cancel;

/**
 * Renders the container that switches between the form, loader and 
 * the visualization of the resulting output from the minizinc model
 */
const Tool = () => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [cancelRequest, setCancelRequest] = useState(false);
  useEffect(() => {
    if (cancelRequest) {
      cancel();
    }
  }, [cancelRequest])

  const handleUploadedResults = (res) => {
    setData(res);
  };

  /**
   * Send the uploaded dzn file contents to the API and wait for the result
   * @param {*} parsedData contains the attributes rows, cols, sizeEmptyEdge, controls from the contents of the dzn file needed to visualize the results
   * @param {*} content the dzn file contents that the API mzn model needs to go through
   */
  const handleUploadedDznFile = async (parsedData, content) => {
    setError(false);
    setLoading(true);
    axios
      .post(
        `${config.url.API_URL}/dzn_file`,
        { data: content },
        {
          headers: {
            "Content-Type": "application/json",
          },
          cancelToken: new CancelToken(function executor(c) {
            cancel = c;
          })
        }
      )
      .then(
        (res) => {
          setData({
            rows: parsedData.rows,
            cols: parsedData.cols,
            sizeEmptyEdge: parsedData.sizeEmptyEdge,
            controls: parsedData.controls,
            result: res.data,
          });
        }).catch((error) => {
          if (axios.isCancel(error)) {
            setLoading(false)
            setCancelRequest(false);
            return;
          }
          setLoading(false)
          setError(error.response.data.message);
        });
  };
  React.useEffect(() => {
    if (data !== undefined) {
      setLoading(false);
    }
  }, [loading, data]);

  return (
    <StyledToolWrapper>
      {data !== undefined ? (
        <PlateLayout
          data={data.result}
          rows={data.rows}
          cols={data.cols}
          controls={data.controls}
          sizeEmptyEdge={data.sizeEmptyEdge}
        />
      ) : loading ? (
        <Loader setCancelRequest={setCancelRequest}/>
      ) : (
        <TransitionPage
          handleUploadedResults={handleUploadedResults}
          handleUploadedDznFile={handleUploadedDznFile}
          setData={setData}
          error={error}
        />
      )}
    </StyledToolWrapper>
  );
};

export default Tool;
