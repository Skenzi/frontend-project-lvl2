import gendiff from '../index.js';

const filepath1 = 'file1.json';

const filepath2 = 'file2.json';

const ozid = [
  '- follow: false',
  'host: hexlet.io',
  '- proxy: 123.234.53.22',
  '- timeout: 50\n+ timeout: 20',
  '+ verbose: true',
];

test('test1', () => {
  expect(gendiff(filepath1, filepath2)).toEqual(`{\n\n${ozid.join('\n')}\n\n}`);
});
