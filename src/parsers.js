import fs from 'node:fs';
import yaml from 'js-yaml';
import process from 'node:process';
import path from 'node:path';

const readFile = (filePath) => {
  const currenDirectory = process.cwd();
  const absoluteFilePath = path.resolve(currenDirectory, filePath);

  return fs.readFileSync(absoluteFilePath);
};

const getFileType = (fileName) => path.extname(fileName);

export default (filePath) => {
  const fileData = readFile(filePath);
  const fileType = getFileType(filePath);

  switch (fileType.toLowerCase()) {
    case '.json': {
      return JSON.parse(fileData);
    }

    case '.yml':
    case '.yaml': {
      return yaml.load(fileData);
    }

    default:
      throw new Error('This file is not supported');
  }
};
