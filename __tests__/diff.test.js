import fs from 'fs';
import path from 'path';
import getDiff from '../src';

const fixtures = '__tests__/__fixtures__/';

test('Empty files', () => {
  const firstPath = path.join(fixtures, 'empty.json');
  const secondPath = path.join(fixtures, 'empty2.json');
  expect(getDiff(firstPath, secondPath)).toEqual('{}');
});

test('To JSON test', () => {
  const firstPath = path.join(fixtures, 'before.json');
  const secondPath = path.join(fixtures, 'after.json');
  const diff = getDiff(firstPath, secondPath, 'json');
  const result = fs.readFileSync(path.join(fixtures, 'result.json'), 'utf8');
  expect(diff).toEqual(result);
});

test('Plain test', () => {
  const plainResult = fs.readFileSync(path.join(fixtures, 'plainResult'), 'utf8');
  const firstPath = path.join(fixtures, 'plainBefore.json');
  const secondPath = path.join(fixtures, 'plainAfter.json');
  const diff = getDiff(firstPath, secondPath, 'plain');
  expect(diff).toBe(plainResult);
});

test.each([
  ['before.json', 'after.json'],
  ['ymlBefore.yml', 'iniAfter.ini'],
  ['iniBefore.ini', 'iniAfter.ini'],
])(
  'Files test',
  (before, after) => {
    const firstPath = path.join(fixtures, before);
    const secondPath = path.join(fixtures, after);
    const expectedFile = path.join(fixtures, 'result');
    const expected = fs.readFileSync(expectedFile, 'utf8');
    expect(getDiff(firstPath, secondPath, 'objectview')).toEqual(expected);
  },
);
