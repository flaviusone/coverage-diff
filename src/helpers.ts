export const mapToObject = (map: Map<string, any>) => {
  let objMap: any = {};
  map.forEach((v, k) => {
    objMap[k] = v;
  });
  return objMap;
};

export const objectToMap = (obj: object): Map<string, any> =>
  new Map(Object.entries(obj));
