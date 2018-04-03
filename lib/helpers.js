module.exports.mapToObject = map => {
  let objMap = {};
  map.forEach((v, k) => {
    objMap[k] = v;
  });
  return objMap;
};

module.exports.objectToMap = obj => new Map(Object.entries(obj));
