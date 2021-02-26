import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

const parseFile = (file) => {
  const extname = path.extname(file);
  if (extname === '.json') {
    return JSON.parse(fs.readFileSync(file, 'utf-8'));
  }
  if (extname === '.yml') {
    return yaml.load(fs.readFileSync(file, 'utf-8'));
  }
  throw new Error('Unexpected extname: ');
};

export default parseFile;
