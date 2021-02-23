import parseFile from './parses.js';
import getPathToFile from './buildPath.js';
import genTree from './genTree.js';
import formmater from './formmaters/index.js';

const genDiff = (filepath1, filepath2, formatName) => {
  const path1 = getPathToFile(filepath1);
  const dataFile1 = parseFile(path1);
  const path2 = getPathToFile(filepath2);
  const dataFile2 = parseFile(path2);
  const tree = genTree(dataFile1, dataFile2);
  return formmater(tree, formatName);
};

export default genDiff;
