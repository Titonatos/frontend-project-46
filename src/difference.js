import _ from 'lodash';
import getData from './parsers.js';
import stylish from './stylish.js';

const getDifference = (path1, path2, formater = stylish) => {
  const file1Data = getData(path1);
  const file2Data = getData(path2);

  const iter = (file1, file2, depth = 1) => {
    const isObject = (obj) => Object.prototype.toString.call(obj) === '[object Object]';

    const keys1 = Object.keys(file1);
    const keys2 = Object.keys(file2);

    const noChangeStatus = 'noChange';
    const addedStatus = 'added';
    const removedStatus = 'removed';

    const file1Difference = keys1.flatMap((key) => {
      if (keys2.includes(key)) {
        if (isObject(file1[key]) && isObject(file2[key])) {
          return { key, value: iter(file1[key], file2[key], depth + 1), status: noChangeStatus };
        }

        if (file1[key] === file2[key]) {
          return { key, value: file1[key], status: noChangeStatus };
        }

        return [
          { key, value: file1[key], status: removedStatus },
          { key, value: file2[key], status: addedStatus }];
      }

      return { key, value: file1[key], status: removedStatus };
    });

    const file2Additional = keys2
      .filter((key) => keys1.includes(key) === false)
      .flatMap((key) => ({ key, value: file2[key], status: addedStatus }));

    return _.sortBy(
      _.concat(file1Difference, file2Additional),
      (obj) => obj.key,
    );
  };

  return formater(iter(file1Data, file2Data));
};

export default getDifference;
