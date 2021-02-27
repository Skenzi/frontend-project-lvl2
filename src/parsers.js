import yaml from 'js-yaml';

const parseFile = (fileData, extension) => {
  if (extension === '.json') {
    return JSON.parse(fileData);
  }
  if (extension === '.yml') {
    return yaml.load(fileData);
  }
  throw new Error(`Unexpected extension: ${extension}`);
};

export default parseFile;
