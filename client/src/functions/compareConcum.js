export const concentrationsLabels = ["L", "M", "H"];
/** 
 * Compares two objects a and b and returns comparison value depending on the CONCuM property of a and b
 * @pre CONCuM property needs to exist in both a and b
 * @param: a an object representing one row of the output from minizinc 
 * @param: b an object representing one row of the output from minizinc 
 * @example: let a = {cmpdname:cm1, CONCuM:100,...} and b = {cmpdname:cm2, CONCuM:1,...}
             then compare(a,b) will return -1
*/
export const compareConcum = (a, b) => {

  if (
    concentrationsLabels.includes(a.CONCuM) &&
    concentrationsLabels.includes(b.CONCuM)
  ) {
    let a_conc = a.CONCuM;
    let b_conc = b.CONCuM;
    a = concentrationsLabels.findIndex((elem) => a_conc === elem);
    b = concentrationsLabels.findIndex((elem) => b_conc === elem);
    if (a < b) {
      return 1;
    }
    if (a > b) {
      return -1;
    }
    return 0;
  } else {
    if (isNaN(a.CONCuM) && !isNaN(b.CONCuM)) {
      return 1;
    }
    if (!isNaN(a.CONCuM) && isNaN(b.CONCuM)) {
      return -1;
    }
    if (!isNaN(a.CONCuM) && !isNaN(b.CONCuM)) {
      if (parseFloat(a.CONCuM) < parseFloat(b.CONCuM)) {
        return 1;
      }
      if (parseFloat(a.CONCuM) > parseFloat(b.CONCuM)) {
        return -1;
      }
      return 0;
    }
    if (a.CONCuM < b.CONCuM) {
      return 1;
    }
    if (a.CONCuM > b.CONCuM) {
      return -1;
    }
    return 0;
  }
};
