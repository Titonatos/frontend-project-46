import format from './formatters/format.js';
import getDifference from './difference.js';

export default (filePath1, filepath2, formatter = 'stylish') => {
  const difference = getDifference(filePath1, filepath2, formatter);

  return format(difference, formatter);
};
