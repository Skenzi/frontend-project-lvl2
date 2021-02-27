import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

const parseFile = (file) => {
  const extension = path.extname(file);
  if (extension === '.json') {
    return JSON.parse(fs.readFileSync(file, 'utf-8'));
  }
  if (extension === '.yml') {
    return yaml.load(fs.readFileSync(file, 'utf-8'));
  }
  throw new Error(`Unexpected extension: ${extension}`);
};

export default parseFile;
