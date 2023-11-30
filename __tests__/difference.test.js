import getDifference from '../src/difference.js';
import result from '../__fixtures__/differenceResult.js';

beforeEach(() => {
//   const __filename = fileURLToPath(import.meta.url);
//   const __dirname = dirname(__filename);

// const referenceRecFilePath = path.resolve(`${__dirname}`,'../__fixtures__/differenceResult.txt');
//   expectedRecurentDiff = fs.readFileSync(referenceRecFilePath, 'utf-8');
});

test('recurentJSONDifference', () => {
  expect(getDifference('__fixtures__/recFile1.json', '__fixtures__/recFile2.json')).toEqual(result);
});
