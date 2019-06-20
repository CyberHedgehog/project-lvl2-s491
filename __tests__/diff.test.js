import fs from 'fs';
import path from 'path';
import getDiff from '../src';

const fixtures = '__tests__/__fixtures__/';

test('Empty JSON', () => {
  const before = path.join(fixtures, 'empty.json');
  const after = path.join(fixtures, 'empty2.json');
  expect(getDiff(before, after)).toEqual({});
});

test('To JSON test', () => {
  const before = path.join(fixtures, 'before.json');
  const after = path.join(fixtures, 'after.json');
  const diff = getDiff(before, after, 'json');
  const result = JSON.parse(fs.readFileSync(path.join(fixtures, 'result.json'), 'utf8'));
  expect(diff).toEqual(result);
});

test('Plain test', () => {
  const plainResult = fs.readFileSync(path.join(fixtures, 'plainResult'), 'utf8');
  const before = path.join(fixtures, 'plainBefore.json');
  const after = path.join(fixtures, 'plainAfter.json');
  const diff = getDiff(before, after, 'plain');
  expect(diff).toBe(plainResult);
});

test.each([
  ['before.json', 'after.json'],
  ['ymlBefore.yml', 'iniAfter.ini'],
  ['iniBefore.ini', 'iniAfter.ini'],
])(
  'Files test',
  (before, after) => {
    const beforeFile = path.join(fixtures, before);
    const afterFile = path.join(fixtures, after);
    const expectedFile = path.join(fixtures, 'result.json');
    const expexted = JSON.parse(fs.readFileSync(expectedFile, 'utf8'));
    expect(getDiff(beforeFile, afterFile, 'default')).toEqual(expexted);
  },
);
