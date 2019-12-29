const kvArray = searchString => {
  // url query string => array of [key, value] pairs
  return searchString
    .slice(1, searchString.length)
    .split("&")
    .filter(kvp => kvp.includes("="))
    .map(kvp => kvp.split("="));
};

const kvMap = kvArray => new Map(kvArray);

const mapQuery = searchString => kvMap(kvArray(searchString));

const mapToObj = map =>
  [...map].reduce((obj, value) => {
    obj[value[0]] = value[1];
    return obj;
  }, {});

const objQuery = searchString => mapToObj(mapQuery(searchString));

export { mapToObj, objQuery, mapQuery };

export default mapQuery;
