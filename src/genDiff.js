import path from 'path';
import parseFile from './parsers.js';
import genTree from './genTree.js';
import formmater from './formmaters/index.js';

const getPathToFile = (filepath) => path.resolve(process.cwd(), filepath);

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const fullPath1 = getPathToFile(filepath1);
  const dataFile1 = parseFile(fullPath1);

  const fullPath2 = getPathToFile(filepath2);
  const dataFile2 = parseFile(fullPath2);

  const tree = genTree(dataFile1, dataFile2);
  return formmater(tree, formatName);
};

export default genDiff;
