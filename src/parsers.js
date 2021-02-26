import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

const parseFile = (file) => {
  if (path.extname(file) === '.json') {
    return JSON.parse(fs.readFileSync(file, 'utf-8'));
  }
  if (path.extname(file) === '.yml') {
    return yaml.load(fs.readFileSync(file, 'utf-8'));
  }
  return 'error';
};

export default parseFile;
