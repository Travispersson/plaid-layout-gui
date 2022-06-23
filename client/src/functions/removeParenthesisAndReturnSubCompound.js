
const removeParenthesisAndReturnSubCompound = (str) => {
    let arr = [];
    let start, end;
    if (str.charAt(0) !== "(") {
      return [str];
    }
    for (let i = 0; i < str.length; i++) {
      if (str.charAt(i) === "(") {
        start = i + 1;
      }
      if (str.charAt(i) === ")") {
        end = i;
        arr.push(str.substring(start, end));
      }
    }
  
    if (arr.length > 1) return null;
    return arr;
  };
  
  export default removeParenthesisAndReturnSubCompound
  