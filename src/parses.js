import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

const parseFile = (file) => {
  if (path.extname(file) === '.json') {
    return JSON.parse(fs.readFileSync(file));
  }
  if (path.extname(file) === '.yml') {
    return yaml.load(fs.readFileSync(file));
  }
  return 'error';
};

export default parseFile;
