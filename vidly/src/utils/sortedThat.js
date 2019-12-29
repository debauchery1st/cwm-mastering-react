/*
  sort array of objects by "key".
    supports nested keys with "dot.notation.path.traversal"
*/

const sortedThat = (arr, sortColumn, cast = String) =>
  arr.sort((a, b) => {
    if (!sortColumn.path) {
      console.log("no sort path");
      return 0;
    }
    const a0 = cast(nextDot(a, sortColumn.path));
    const b0 = cast(nextDot(b, sortColumn.path));
    const [a1, b1] =
      typeof cast === typeof String
        ? [a0.charCodeAt(0), b0.charCodeAt(0)]
        : [a0, b0];
    return { asc: a1 - b1, desc: b1 - a1 }[sortColumn.order];
  });

const nextDot = (obj, dotNotes) => {
  // returns a value from an object using a string "written.in.dot.notation"
  if (dotNotes.length === 0) {
    return obj;
  }
  // console.log(dotNotes);
  const keys = dotNotes.split(".");
  const nextkeys = keys.length > 1 ? keys.slice(1, keys.length).join(".") : "";
  const nextLevel = obj[keys[0]] || `error, "${keys}" not found.`;
  return nextDot(nextLevel, nextkeys); // keep on walking
};

export { nextDot, sortedThat };

export default sortedThat;
