import { test, expect, describe } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';

import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fullPathTest = (file) => path.join(__dirname, '..', '__fixtures__', file);

const cases = [
  ['json', 'stylish'],
  ['json', 'plain'],
  ['json', 'json'],
  ['yml', 'stylish'],
  ['yml', 'plain'],
  ['yml', 'json'],
];

describe('gendiff', () => {
  test.each(cases)('gendiff %s %s', (extension, format) => {
    const getPathToTest1 = fullPathTest(`before.${extension}`);
    const getPathToTest2 = fullPathTest(`after.${extension}`);

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
  test('diff between .json and .yml', () => {
    const getPathToTest1 = fullPathTest('before.json');
    const getPathToTest2 = fullPathTest('after.yml');

    const getPathToResult = fullPathTest('result_stylish.txt');
    const dataResult = fs.readFileSync(getPathToResult, 'utf-8');
    expect(genDiff(getPathToTest1, getPathToTest2)).toEqual(dataResult);
  });
  test('wrong format', () => {
    const getPathToTest1 = fullPathTest('before.json');
    const getPathToTest2 = fullPathTest('after.json');

    expect(() => genDiff(getPathToTest1, getPathToTest2, 'error')).toThrow();
  });
  test('wrong extension', () => {
    const getPathToTest1 = fullPathTest('before.json');
    const getPathToTest2 = fullPathTest('result_plain.txt');

    expect(() => genDiff(getPathToTest1, getPathToTest2, 'plain')).toThrow();
  });
});
