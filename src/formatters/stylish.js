import _ from 'lodash';

const getIndent = (multipler, correction = 2, indent = ' ', indentPerMultipler = 4) => `${indent.repeat(multipler * indentPerMultipler - correction)}`;

const getValue = (object) => (Object.prototype.hasOwnProperty.call(object, 'children') ? object.children : object.value);

const hasObjectChildren = (obj) => _.isPlainObject(getValue(obj));

const getStatus = (object) => object.status;

const getPrefix = (status) => {
  const prefixes = {
    noChange: '  ',
    added: '+ ',
    removed: '- ',
    old: '- ',
    updated: '+ ',
  };

  return prefixes[status] ?? '';
};

const stylish = (data) => {
  const formatLine = (key, value, status, depth, correction = 2) => `${getIndent(depth, correction) + getPrefix(status) + key}: ${value}`;

  const formatObject = (key, status, children, depth) => {
    const formattedChildren = Array.isArray(children) ? children.join('\n') : children;

    return [
      `${getIndent(depth) + getPrefix(status) + key}: {`,
      formattedChildren,
      `${getIndent(depth, 0)}}`,
    ];
  };

  const iter = (dataToIter, depth = 0) => {
    if (Array.isArray(dataToIter)) {
      return dataToIter.flatMap((obj) => iter(obj, depth + 1)).join('\n');
    }

    if (Array.isArray(getValue(dataToIter))) {
      return formatObject(dataToIter.key, getStatus(dataToIter), getValue(dataToIter)
        .flatMap((obj) => iter(obj, depth + 1)), depth);
    }

    if (hasObjectChildren(dataToIter)) {
      return formatObject(
        dataToIter.key,
        getStatus(dataToIter),
        iter(
          getValue(dataToIter),
          depth + 1,
        ),
        depth,
      );
    }

    if (getStatus(dataToIter) !== undefined) {
      return formatLine(dataToIter.key, getValue(dataToIter), getStatus(dataToIter), depth);
    }

    return Object.keys(dataToIter).map((key) => {
      if (_.isPlainObject(dataToIter[key])) {
        return [
          `${getIndent(depth, 0) + getPrefix(getStatus(dataToIter)) + key}: {`,
          iter(dataToIter[key], depth + 1),
          `${getIndent(depth, 0)}}`,
        ].join('\n');
      }

      return formatLine(key, dataToIter[key], getStatus(dataToIter), depth, 0);
    });
  };

  return `{\n${iter(data)}\n}`;
};

export default stylish;
