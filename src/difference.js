import _ from 'lodash';
import getData from './parsers.js';

export default (fileName1, fileName2) => {
  const file1 = getData(fileName1);
  const file2 = getData(fileName2);

  const keys1 = Object.keys(file1).sort();
  const keys2 = Object.keys(file2).sort();

  const same = '    ';
  const origin = '  - ';
  const other = '  + ';

  const differents = keys1.map((key) => {
    if (keys2.includes(key) === false) {
      return `${origin + key} : ${file1[key]}`;
    }

    if (file1[key] === file2[key]) {
      return `${same + key} : ${file1[key]}`;
    }

    const diff1 = `${origin + key} : ${file1[key]}`;
    const diff2 = `${other + key} : ${file2[key]}`;

    return `${diff1}\n${diff2}`;
  });

  const remainingDifferents = keys2
    .filter((key) => keys1.includes(key) === false)
    .map((key) => `${other + key} : ${file2[key]}`);

  const allDifferents = _.concat('{', differents, remainingDifferents, '}');

  return allDifferents.join('\n');
};
