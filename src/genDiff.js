import path from 'path';
import fs from 'fs';
import parseFile from './parsers.js';
import genTree from './genTree.js';
import formmater from './formmaters/index.js';

const getPathToFile = (filePath) => path.resolve(process.cwd(), filePath);
const readFile = (filePath) => fs.readFileSync(filePath, 'utf-8');
const getExtension = (filePath) => path.extname(filePath);

const genDiff = (filePath1, filePath2, formatName = 'stylish') => {
  const fullPath1 = getPathToFile(filePath1);
  const fileData1 = parseFile(readFile(fullPath1), getExtension(fullPath1));

  const fullPath2 = getPathToFile(filePath2);
  const fileData2 = parseFile(readFile(fullPath2), getExtension(fullPath2));

  const tree = genTree(fileData1, fileData2);
  return formmater(tree, formatName);
};

export default genDiff;
