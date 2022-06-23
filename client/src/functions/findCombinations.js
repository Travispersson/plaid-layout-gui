
const splitParenthesis = (str) => {
    let arr = [];
    let start, end;
    for (let i = 0; i < str.length; i++) {
  
      if (str.charAt(i) === "(") {
        start = i;
      }
      if (str.charAt(i) === ")") {
        end = i + 1;
        arr.push(str.substring(start, end))
      }
    }
    return arr;
  }

  /**
   * 
   * @param cmpName string of compound to decode if its a combination
   *        -- Example: "(a)(b)" is a combination made up of (a) and (b)
   *        -- Example: "c100" is not a combination since its only made up of a single compound (c100)
   * @returns a list of all compounds that make up the combination by decoding cmpname or null if single compound
   */
  const findCombinations = (cmpname) => {
    const regex = RegExp(/^\w*(?<!.)(\([^\(\)\s\t]+\)){1,4}(?=$)/);
      if (regex.test(cmpname)) {
        let compoundsInCombos = splitParenthesis(cmpname);
        if(compoundsInCombos.length > 1)
              return(compoundsInCombos); 
      }
    return null;
  }
  
export default findCombinations;