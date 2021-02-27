import { test, expect, describe } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';

import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fullPathTest = (file) => path.join(__dirname, '..', '__fixtures__', file);

const elements = [
  ['json', 'stylish'],
  ['json', 'plain'],
  ['json', 'json'],
  ['yml', 'stylish'],
  ['yml', 'plain'],
  ['yml', 'json'],
];

describe('gendiff', () => {
  test.each(elements)('gendiff %s %s', (element, format) => {
    const getPathToTest1 = fullPathTest(`before.${element}`);
    const getPathToTest2 = fullPathTest(`after.${element}`);

    const getPathToResult = fullPathTest(`result_${format}.txt`);
    const dataResult = fs.readFileSync(getPathToResult, 'utf-8');
    expect(genDiff(getPathToTest1, getPathToTest2, format)).toEqual(dataResult);
  });
});

describe('other tests', () => {
  test('without format', () => {
    const getPathToTest1 = fullPathTest('before.json');
    const getPathToTest2 = fullPathTest('after.json');

    const getPathToResult = fullPathTest('result_stylish.txt');
    const dataResult = fs.readFileSync(getPathToResult, 'utf-8');
    expect(genDiff(getPathToTest1, getPathToTest2)).toEqual(dataResult);
  });
});
