import fs from 'node:fs';
import yaml from 'js-yaml';
import process from 'node:process';
import path from 'node:path';

const readFile = (fileName) => {
  const currenDirectory = process.cwd();
  const absoluteFilePath = path.resolve(currenDirectory, fileName);

  return fs.readFileSync(absoluteFilePath);
};

const getFileType = (fileName) => path.extname(fileName);

export default (fileName) => {
  const fileData = readFile(fileName);
  const fileType = getFileType(fileName);

  if (fileType.toLowerCase() === '.json') {
    return JSON.parse(fileData);
  }

  if (fileType.toLowerCase() === '.yml' || fileType.toLowerCase() === '.yaml') {
    return yaml.load(fileData);
  }

  return fileData;
};
