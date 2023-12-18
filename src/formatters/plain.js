const getValue = (object) => (Object.prototype.hasOwnProperty.call(object, 'children') ? object.children : object.value);

const getFormatedValue = (obj) => {
  const value = getValue(obj);

  if (typeof value === 'object' && value !== null) {
    return '[complex value]';
  }

  if (typeof value === 'string') {
    return `'${value}'`;
  }

  return value;
};

const plain = (data) => {
  const iter = (dataToIter, depthPath = '') => {
    const currentDepthPath = depthPath ? `${depthPath}.${dataToIter.key}` : `${dataToIter.key}`;
    const value = getValue(dataToIter);

    switch (dataToIter.status) {
      case 'noChange': {
        if (Array.isArray(value)) {
          return value.flatMap((obj) => iter(obj, `${currentDepthPath}`));
        }

        return iter(value, dataToIter.key);
      }

      case 'added': {
        return `Property '${currentDepthPath}' was added with value: ${getFormatedValue(dataToIter)}\n`;
      }

      case 'removed': {
        return `Property '${currentDepthPath}' was removed\n`;
      }

      case 'old': {
        return `Property '${currentDepthPath}' was updated. From ${getFormatedValue(dataToIter)}`;
      }

      case 'updated': {
        return ` to ${getFormatedValue(dataToIter)}\n`;
      }

      default: {
        if (Array.isArray(dataToIter)) {
          return dataToIter.flatMap((obj) => iter(obj, dataToIter.key));
        }

        return null;
      }
    }
  };

  return iter(data).join('').slice(0, -1);
};

export default plain;
