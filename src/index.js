import fs from 'node:fs';
import process from 'node:process';
import path from 'node:path';
import format from './formatters/format.js';
import getDifference from './difference.js';
import parse from './parsers.js';

const readFile = (filePath) => {
  const currenDirectory = process.cwd();
  const absoluteFilePath = path.resolve(currenDirectory, filePath);

  return fs.readFileSync(absoluteFilePath);
};

const getFileType = (fileName) => path.extname(fileName).split('.')[1];

export default (filePath1, filepath2, formatter = 'stylish') => {
  const file1ParsedData = parse(readFile(filePath1), getFileType(filePath1));
  const file2ParsedData = parse(readFile(filepath2), getFileType(filepath2));

  const difference = getDifference(file1ParsedData, file2ParsedData, formatter);

  return format(difference, formatter);
};
