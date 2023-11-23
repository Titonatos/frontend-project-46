/* eslint-disable max-len */
const stylish = (data) => {
  const noChangePrefix = '  ';
  const addedPrefix = '+ ';
  const removedPrefix = '- ';

  const status = {
    noChange: '  ',
    added: '+ ',
    removed: '- ',
    undefined: '    ',
  };

  const getIndent = (multipler, correction = 2, indent = ' ', indentPerMultipler = 4) => `${indent.repeat(multipler * indentPerMultipler - correction)}`;

  const getLine = (depth, key, value, prefix = noChangePrefix, correction = 2) => `${getIndent(depth, correction) + prefix + key}: ${value}`;

  const isObject = (obj) => Object.prototype.toString.call(obj) === '[object Object]';

  const getKey = (object) => object.key;

  const getValue = (object, value = 'value') => object[value];

  const hasArrayChildren = (obj) => Array.isArray(getValue(obj));

  const hasObjectChildren = (obj) => isObject(getValue(obj));

  const getStatus = (object) => object.status;

  const iter = (dataToIter, depth = 0) => {
    if (Array.isArray(dataToIter)) {
      return dataToIter.flatMap((obj) => iter(obj, depth + 1)).join('\n');
    }

    if (hasArrayChildren(dataToIter)) {
      return [
        `${getIndent(depth) + status[getStatus(dataToIter)] + getKey(dataToIter)}: {`,
        getValue(dataToIter).flatMap((obj) => iter(obj, depth + 1)).join('\n'),
        `${getIndent(depth, 0)}}`,
      ];
    }

    if (hasObjectChildren(dataToIter)) {
      return [
        `${getIndent(depth) + status[getStatus(dataToIter)] + getKey(dataToIter)}: {`,
        iter(getValue(dataToIter), depth + 1),
        `${getIndent(depth, 0)}}`,
      ].join('\n');
    }

    if (getStatus(dataToIter) === undefined) {
      return Object.keys(dataToIter).flatMap((key) => {
        if (isObject(dataToIter[key])) {
          return [
            `${getIndent(depth) + status[getStatus(dataToIter)] + key}: {`,
            iter(dataToIter[key], depth + 1),
            `${getIndent(depth, 0)}}`,
          ].join('\n');
        }

        return getLine(depth, key, dataToIter[key], status[getStatus(dataToIter)]);
      }).join('\n');
    }

    return getLine(depth, getKey(dataToIter), getValue(dataToIter), status[getStatus(dataToIter)]);
  };

  return `{\n${iter(data)}\n}`;
};

export default stylish;
