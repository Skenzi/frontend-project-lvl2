import _ from 'lodash';
import parseFile from './parseFile.js';
import fullPath from './buildPath.js';

const genDiff = (filepath1, filepath2) => {
  const fullPath1 = fullPath(filepath1);
  const fullPath2 = fullPath(filepath2);
  const obj1 = parseFile(fullPath1);
  const obj2 = parseFile(fullPath2);
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const unionKeys = _.sortBy(_.union(keys1, keys2));

  const diffFiles = unionKeys.map((key) => {
    if (!_.has(obj1, key)) {
      return `+ ${key}: ${obj2[key]}`;
    }
    if (!_.has(obj2, key)) {
      return `- ${key}: ${obj1[key]}`;
    }
    if (obj1[key] !== obj2[key]) {
      return `- ${key}: ${obj1[key]}\n+ ${key}: ${obj2[key]}`;
    }
    return `${key}: ${obj2[key]}`;
  });
  return `{\n\n${diffFiles.join('\n')}\n\n}`;
};

export default genDiff;
