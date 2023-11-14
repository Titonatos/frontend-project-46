import fs from 'node:fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'node:path';
import genDiff from '../src/parse.js';

let __filename;
let __dirname;

beforeEach(() => {
  __filename = fileURLToPath(import.meta.url);
  __dirname = dirname(__filename);
});

test('scanDifference', () => {
  const referenceFilePath = path.resolve(`${__dirname}`, '../__fixtures__/result.txt');
  const expectedDiff = fs.readFileSync(referenceFilePath, 'utf-8');

  expect(genDiff('file1.json', 'file2.json').trim()).toMatch(expectedDiff.trim());
});
