import _ from 'lodash';
import getData from './parsers.js';

const isObject = (obj) => Object.prototype.toString.call(obj) === '[object Object]';

const getStatuses = {
  noChange: 'noChange',
  added: 'added',
  removed: 'removed',
  old: 'old',
  updated: 'updated',
};

const getDifference = (path1, path2) => {
  const file1Data = getData(path1);
  const file2Data = getData(path2);

  const iter = (file1, file2, depth = 1) => {
    const {
      noChange, added, removed, old, updated,
    } = getStatuses;

    const keys1 = Object.keys(file1);
    const keys2 = Object.keys(file2);

    const file1Difference = keys1.flatMap((key) => {
      if (keys2.includes(key) === false) {
        return { key, value: file1[key], status: removed };
      }

      if (isObject(file1[key]) && isObject(file2[key])) {
        return { key, value: iter(file1[key], file2[key], depth + 1), status: noChange };
      }

      if (file1[key] === file2[key]) {
        return { key, value: file1[key], status: noChange };
      }

      return [
        { key, value: file1[key], status: old },
        { key, value: file2[key], status: updated }];
    });

    const file2Additional = keys2
      .filter((key) => !keys1.includes(key))
      .flatMap((key) => ({ key, value: file2[key], status: added }));

    return _.sortBy(_.concat(file1Difference, file2Additional), (obj) => obj.key);
  };

  return iter(file1Data, file2Data);
};

export default getDifference;
