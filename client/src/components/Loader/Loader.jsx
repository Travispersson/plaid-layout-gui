import React from "react";
import styled from "styled-components";

/* 
inspired by: https://gist.github.com/knowbody/578b35164b69e867ed4913423f6bed30
*/

const StyledLoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  margin: auto;
  justify-content:center;
`;
const StyledSpinner = styled.svg`
  animation: rotate 1s linear infinite;
  margin: 10px;

  width: ${(props) => props.size}px;

  & .path {
    stroke: #584b4f;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -25;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -120;
    }
  }
`;

const StyledCancelButton = styled.button`
  font-family: Whitney, "Open Sans", Helvetica, sans-serif;
  background-color: #5096FF;
  border: 2px solid #5096FF;
  color: #fff;
  font-weight: 400;
  font-size: 16pt;
  border-radius: 25px;
  cursor: pointer;
  height: 45px;
  width: 200px;
  margin: 50px;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);
  &:hover {
    outline: none;
    border: 1px solid #5096ff;
  }
`

/**
 * Renders the loading spinner when waiting for the API to run the minizinc model
 */
const Loader = (props) => {
  const size = 45;
  return (
    <StyledLoaderContainer>
      <StyledSpinner size={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          className="path"
          cx={size / 2}
          cy={size / 2}
          r="20"
          fill="none"
          strokeWidth="2"
        />       
      </StyledSpinner>
      Your plate layout is being calculated. This process can take several minutes...
      <StyledCancelButton type='button' onClick={() => props.setCancelRequest(true)}>Cancel</StyledCancelButton>

    </StyledLoaderContainer>
  );
};

export default Loader;
