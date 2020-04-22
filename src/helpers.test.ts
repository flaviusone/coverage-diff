import { objectToMap, mapToObject } from './helpers';

const myObject = {
  foo: 'bar'
};
const myMap = new Map([
  ['foo', 'bar'],
  ['bar', 'foo']
]);

describe('helpers', () => {
  describe('objectToMap', () => {
    it('should return a map', () => {
      expect(objectToMap(myObject)).toBeInstanceOf(Map);
    });

    it('should correctly map object data', () => {
      expect(objectToMap(myObject).get('foo')).toEqual('bar');
    });
  });

  describe('objectToMap', () => {
    it('should correctly create object from map', () => {
      expect(mapToObject(myMap)).toMatchObject({
        foo: 'bar',
        bar: 'foo'
      });
    });
  });
});
