import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

const parseFile = (file) => {
  let parse;
  if (path.extname(file) === '.json') {
    parse = JSON.parse(fs.readFileSync(file));
  }
  if (path.extname(file) === '.yml') {
    parse = yaml.load(fs.readFileSync(file));
  }
  return parse;
};

export default parseFile;
