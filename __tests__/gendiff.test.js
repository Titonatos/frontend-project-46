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

describe.each(['stylish', 'plain', 'json'])('gendiff > %s format', (formatter) => {
  test.each([
    ['json', 'json'],
    ['yaml', 'yml'],
    ['json', 'yml']])('> %s : %s file types', (type1, type2) => {
    const resultJSON = genDiff(`__fixtures__/recFile1.${type1}`, `__fixtures__/recFile2.${type2}`, formatter);
    const expected = getFileData(`${formatter}Result.txt`);

    expect(resultJSON).toEqual(expected);
  });
});
