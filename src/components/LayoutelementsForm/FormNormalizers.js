const normalizeCoordinate = (value) => {
  if (!value) {
    return value;
  }
  if (value === undefined || value === '-') {
    return value;
  }
  return parseInt(value, 10);
};

export default normalizeCoordinate;
