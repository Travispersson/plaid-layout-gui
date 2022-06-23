const truncateString = (str, len) => {
  return str.length <= len ? str : str.slice(0, len-1) + "...";
};

export default truncateString;
