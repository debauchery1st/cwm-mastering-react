const range = (start, end, step) => {
  // returns an array of numbers [start ... end]
  const result = [];
  if (start) {
    if (!end) {
      end = start;
      start = 1;
    }
    if (!step) step = 1;
    for (let i = start; i < end; i += step) result.push(i);
  }
  return result;
};

export default range;
