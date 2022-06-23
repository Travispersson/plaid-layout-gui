/* generate hues depending on amount parameter, the hgiher the amount the less spread between hues */
const generateHslHues = (amount) => {
  let colors = [];
  let huedelta = Math.trunc(360 / amount);

  for (let i = 0; i < amount; i++) {
    let hue = i * huedelta;
    colors.push(hue);
  }
  return colors;
};
export default generateHslHues;
