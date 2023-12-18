import _ from 'lodash';

const getDifference = (file1Data, file2Data) => {
  const iter = (file1, file2, depth = 1) => {
    const noChange = 'noChange';
    const added = 'added';
    const removed = 'removed';
    const old = 'old';
    const updated = 'updated';

    const keys1 = Object.keys(file1);
    const keys2 = Object.keys(file2);
    const keys = _.sortBy(_.union(keys1, keys2));

    const treeDifferences = keys.flatMap((key) => {
      if (keys2.includes(key) === false) {
        return { key, value: file1[key], status: removed };
      }

      if (keys1.includes(key) === false) {
        return { key, value: file2[key], status: added };
      }

      if (file1[key] === file2[key]) {
        return { key, value: file1[key], status: noChange };
      }

      if (_.isPlainObject(file1[key]) && !_.isNull(file1[key])
      && _.isPlainObject(file2[key]) && !_.isNull(file2[key])) {
        return { key, children: iter(file1[key], file2[key], depth + 1), status: noChange };
      }

      return [
        { key, value: file1[key], status: old },
        { key, value: file2[key], status: updated }];
    });

    return treeDifferences;
  //   const file1Difference = keys1.flatMap((key) => {
  //     if (keys2.includes(key) === false) {
  //       return { key, value: file1[key], status: removed };
  //     }

  //     if (_.isPlainObject(file1[key]) && _.isPlainObject(file2[key])) {
  //       return { key, value: iter(file1[key], file2[key], depth + 1), status: noChange };
  //     }

  //     if (file1[key] === file2[key]) {
  //       return { key, value: file1[key], status: noChange };
  //     }

  //     return [
  //       { key, value: file1[key], status: old },
  //       { key, value: file2[key], status: updated }];
  //   });

  //   const file2Additional = keys2
  //     .filter((key) => !keys1.includes(key))
  //     .flatMap((key) => ({ key, value: file2[key], status: added }));

  //   return _.sortBy(_.concat(file1Difference, file2Additional), (obj) => obj.key);
  // };
  };

  return iter(file1Data, file2Data);
};

export default getDifference;
