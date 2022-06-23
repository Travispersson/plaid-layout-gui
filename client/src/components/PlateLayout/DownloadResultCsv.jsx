import React from "react";
import styled from "styled-components";
import { BiDownload } from "react-icons/bi";
import { CSVLink } from "react-csv";

const StyledDownloadButton = styled.button`
  background: none;
  border: none;
  color: inherit;
  font: inherit;
  cursor: pointer;
`;

/*  transform plate output from json to CSV Converter in the order
    plateID - well - cmpdname - CONCuM - cmpdnum
  */
function fromJsonToCsv(plates) {
  let str = "";
  plates.forEach((objArray) => {
    let array = typeof objArray != "object" ? JSON.parse(objArray) : objArray;
    for (var i = 0; i < array.length; i++) {
      var line = "";
      line += array[i].plateID;
      line += ",";
      line += array[i].well;
      line += ",";
      line += array[i].cmpdname;
      line += ",";
      line += array[i].CONCuM;
      line += ",";
      line += array[i].cmpdnum;
      line += ",";
      str += line + "\r\n";
    }
  });

  return str;
}

/**
 * Render a button that downloads the output result shown on the plate as a csv file.
 *
 * @param props.plate all cmpdObjs of the corresponding plate
 * @param single if true generate csv file from a single plate otherwise from all plates
 * @param props.plates each plate generated
 */
const DownloadOutputButton = (props) => {
  const csvRef = React.useRef();
  // Header names are same as output from minizinc model
  const headers = ["plateID,well,cmpdname,CONCuM,cmpdnum"];

  const handleClick = (e) => {
    csvRef.current.link.click();
  };
  return (
    <StyledDownloadButton onClick={handleClick} title={"Download CSV file"}>
      <CSVLink
        filename={props.single ? props.plate[0].plateID + ".csv" : "plates.csv"}
        headers={headers}
        data={fromJsonToCsv(props.single ? [props.plate] : props.plates)}
        ref={csvRef}
      />
      <BiDownload size={props.single ? 24 : 36} />
      <p>CSV</p>
    </StyledDownloadButton>
  );
};

export default DownloadOutputButton;
