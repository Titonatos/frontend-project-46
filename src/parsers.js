import yaml from 'js-yaml';

export default (fileData, fileType) => {
  switch (fileType.toLowerCase()) {
    case 'json': {
      return JSON.parse(fileData);
    }

    case 'yml':
    case 'yaml': {
      return yaml.load(fileData);
    }

    default:
      throw new Error(`Неподдерживаемый тип файла: ${fileType}`);
  }
};
