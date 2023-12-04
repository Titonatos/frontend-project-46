const getValue = (obj) => {
  if (typeof obj.value === 'object' && obj.value !== null) {
    return '[complex value]';
  }

  if (typeof obj.value === 'string') {
    return `'${obj.value}'`;
  }

  return obj.value;
};

const plain = (data) => {
  const iter = (dataToIter, depthPath = '') => {
    const currentDepthPath = depthPath ? `${depthPath}.${dataToIter.key}` : `${dataToIter.key}`;

    switch (dataToIter.status) {
      case 'noChange': {
        if (Array.isArray(dataToIter.value)) {
          return dataToIter.value.flatMap((obj) => iter(obj, `${currentDepthPath}`));
        }

        return iter(dataToIter.value, dataToIter.key);
      }

      case 'added': {
        return `Property '${currentDepthPath}' was added with value: ${getValue(dataToIter)}\n`;
      }

      case 'removed': {
        return `Property '${currentDepthPath}' was removed\n`;
      }

      case 'old': {
        return `Property '${currentDepthPath}' was updated. From ${getValue(dataToIter)}`;
      }

      case 'updated': {
        return ` to ${getValue(dataToIter)}\n`;
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
