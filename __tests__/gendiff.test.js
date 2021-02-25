import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';

import gendiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fullPathTest = (file) => path.join(__dirname, '..', '__fixtures__', file);
const readTestFile = (file) => fs.readFileSync(fullPathTest(file), 'utf-8');

test('test JSON', () => {
  expect(gendiff(fullPathTest('before.json'), fullPathTest('after.json'), 'stylish')).toEqual(readTestFile('resultStylish.txt'));
  expect(gendiff(fullPathTest('before.json'), fullPathTest('after.json'), 'plain')).toEqual(readTestFile('resultPlain.txt'));
  expect(gendiff(fullPathTest('before.json'), fullPathTest('after.json'), 'json')).toEqual(readTestFile('resultJSON.txt'));
});
test('test YML', () => {
  expect(gendiff(fullPathTest('before.yml'), fullPathTest('after.yml'), 'stylish')).toEqual(readTestFile('resultStylish.txt'));
  expect(gendiff(fullPathTest('before.yml'), fullPathTest('after.yml'), 'plain')).toEqual(readTestFile('resultPlain.txt'));
  expect(gendiff(fullPathTest('before.yml'), fullPathTest('after.yml'), 'json')).toEqual(readTestFile('resultJSON.txt'));
});
