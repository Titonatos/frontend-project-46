import fs from 'node:fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'node:path';
import genDiff from '../src/index.js';

const getFileData = (fileName) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const referenceRecFilePath = path.resolve(`${__dirname}`, `../__fixtures__/${fileName}`);

  return fs.readFileSync(referenceRecFilePath, 'utf-8');
};

test('genDiffDefault', () => {
  const resultJSON = genDiff('__fixtures__/recFile1.json', '__fixtures__/recFile2.json');
  const expected = getFileData('stylishResult.txt');

  expect(resultJSON).toEqual(expected);

  const resultYaml = genDiff('__fixtures__/recFile1.yaml', '__fixtures__/recFile2.yml');

  expect(resultYaml).toEqual(expected);
});

test('genDiffPlain', () => {
  const resultJSON = genDiff('__fixtures__/recFile1.json', '__fixtures__/recFile2.json', 'plain');
  const expected = getFileData('plainResult.txt');

  expect(resultJSON).toEqual(expected);

  const resultYaml = genDiff('__fixtures__/recFile1.yaml', '__fixtures__/recFile2.yml', 'plain');

  expect(resultYaml).toEqual(expected);
});

test('genDiffJSON', () => {
  const resultJSON = genDiff('__fixtures__/recFile1.json', '__fixtures__/recFile2.json', 'json');
  const expected = getFileData('JSONResult.txt');

  expect(resultJSON).toEqual(expected);

  const resultYaml = genDiff('__fixtures__/recFile1.yaml', '__fixtures__/recFile2.yml', 'json');

  expect(resultYaml).toEqual(expected);
});
