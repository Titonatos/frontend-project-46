import { fileURLToPath } from 'url';
import path, { dirname } from 'node:path';
import fs from 'node:fs';
import genDiff from '../src/parse.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const referenceFilePath = path.resolve(`${__dirname}`, '../result.txt');

console.log(fs.readFileSync(referenceFilePath, 'utf-8'));
console.log(referenceFilePath);
