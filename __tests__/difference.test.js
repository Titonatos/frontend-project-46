import getDifference from '../src/difference.js';
import result from '../__fixtures__/JSONResult2.js';

test('recurentJSONDifference', () => {
  expect(getDifference('__fixtures__/recFile1.json', '__fixtures__/recFile2.json')).toEqual(result);
});
