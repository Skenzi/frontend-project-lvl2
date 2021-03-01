import yaml from 'js-yaml';

const parse = (data, type) => {
  if (type === 'json') {
    return JSON.parse(data);
  }
  if (type === 'yml') {
    return yaml.load(data);
  }
  throw new Error(`Unexpected type: ${type}`);
};

export default parse;
