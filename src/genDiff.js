import path from 'path';
import fs from 'fs';
import parse from './parser.js';
import genTree from './genTree.js';
import render from './formmaters/index.js';

const getPathToFile = (filePath) => path.resolve(process.cwd(), filePath);
const readFile = (filePath) => fs.readFileSync(filePath, 'utf-8');
const getType = (filePath) => path.extname(filePath).slice(1);

const genDiff = (filePath1, filePath2, formatName = 'stylish') => {
  const fullPath1 = getPathToFile(filePath1);
  const fileData1 = parse(readFile(fullPath1), getType(fullPath1));

  const fullPath2 = getPathToFile(filePath2);
  const fileData2 = parse(readFile(fullPath2), getType(fullPath2));

  const tree = genTree(fileData1, fileData2);
  return render(tree, formatName);
};

export default genDiff;
