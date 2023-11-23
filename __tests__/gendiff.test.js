import fs from 'node:fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'node:path';
import getDifference from '../src/difference.js';

// let expectedDiff;
let expectedRecurentDiff;

beforeEach(() => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const referenceRecFilePath = path.resolve(`${__dirname}`, '../__fixtures__/recurseResult.txt');
  expectedRecurentDiff = fs.readFileSync(referenceRecFilePath, 'utf-8');
});

test('recurentJSONDifference', () => {
  expect(getDifference('__fixtures__/recFile1.json', '__fixtures__/recFile2.json')).toMatch(expectedRecurentDiff);
});
