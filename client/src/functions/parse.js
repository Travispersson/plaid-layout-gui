/**
 * parse str and split into words using delimiter
 * @param {string} delimiter
 * @param {string} str
 * @returns array with all the split up words
 */
const parse = (delimiter, str) => {
/*   // replace trailing delimiter with ""
  const re = new RegExp(`/(^${delimiter})|(,$)/g`, "");
  let trim = str.replace(re, ""); */

  // replace newlines with delimiter
  let trim = str.replace(/\n/g, delimiter);

  const delim = trim.split(delimiter);
  const res = delim.filter((s) => {
    return(s !== "");
  })
  return res;
};
export default parse;
