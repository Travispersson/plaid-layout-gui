// lower level is darker.
const randomColor = (level) => {
    // random color from some range set by level
    if (level > 0) {
      return (
        (Math.floor(Math.random() * level) << 16) |
        (Math.floor(Math.random() * level) << 8) |
        Math.floor(Math.random() * level)
      )
        .toString(16)
        .padStart(6, "0");
    } else {
      // completely random color from the full range
      return Math.floor(Math.random() * 16777215).toString(16);
    } //
  };

export default randomColor;