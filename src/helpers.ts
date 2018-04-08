export const mapToObject = map => {
  let objMap = {};
  map.forEach((v, k) => {
    objMap[k] = v;
  });
  return objMap;
};

export const objectToMap = obj => new Map(Object.entries(obj));
