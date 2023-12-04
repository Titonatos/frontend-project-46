const getIndent = (multipler, correction = 2, indent = ' ', indentPerMultipler = 4) => `${indent.repeat(multipler * indentPerMultipler - correction)}`;

const isObject = (obj) => Object.prototype.toString.call(obj) === '[object Object]';

const getKey = (object) => object.key;

const getValue = (object, value = 'value') => object[value];

const hasObjectChildren = (obj) => isObject(getValue(obj));

const getStatus = (object) => object.status;

const stylish = (data) => {
  const prefixes = {
    noChange: '  ',
    added: '+ ',
    removed: '- ',
    old: '- ',
    updated: '+ ',
    undefined: '',
  };

  const formatLine = (key, value, status, depth, correction = 2) => `${getIndent(depth, correction) + prefixes[status] + key}: ${value}`;

  const formatObject = (key, status, children, depth) => {
    const formattedChildren = Array.isArray(children) ? children.join('\n') : children;

    return [
      `${getIndent(depth) + prefixes[status] + key}: {`,
      formattedChildren,
      `${getIndent(depth, 0)}}`,
    ];
  };

  const iter = (dataToIter, depth = 0) => {
    if (Array.isArray(dataToIter)) {
      return dataToIter.flatMap((obj) => iter(obj, depth + 1)).join('\n');
    }

    if (Array.isArray(getValue(dataToIter))) {
      return formatObject(getKey(dataToIter), getStatus(dataToIter), getValue(dataToIter)
        .flatMap((obj) => iter(obj, depth + 1)), depth);
    }

    if (hasObjectChildren(dataToIter)) {
      return formatObject(
        getKey(dataToIter),
        getStatus(dataToIter),
        iter(
          getValue(dataToIter),
          depth + 1,
        ),
        depth,
      );
    }

    if (getStatus(dataToIter) !== undefined) {
      return formatLine(getKey(dataToIter), getValue(dataToIter), getStatus(dataToIter), depth);
    }

    return Object.keys(dataToIter).map((key) => {
      if (isObject(dataToIter[key])) {
        return [
          `${getIndent(depth, 0) + prefixes[getStatus(dataToIter)] + key}: {`,
          iter(dataToIter[key], depth + 1),
          `${getIndent(depth, 0)}}`,
        ].join('\n');
      }

      return formatLine(key, dataToIter[key], getStatus(dataToIter), depth, 0);
    });
  };

  return `{\n${iter(data)}\n}\n`;
};

export default stylish;
