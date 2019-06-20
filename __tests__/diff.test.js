import fs from 'fs';
import path from 'path';
import getDiff from '../src';

const fixtures = '__tests__/__fixtures__/';
const resultData = JSON.parse(fs.readFileSync(path.join(fixtures, 'result.json'), 'utf8'));

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

test('Yaml test', () => {
  const before = path.join(fixtures, 'ymlBefore.yml');
  const after = path.join(fixtures, 'ymlAfter.yml');
  const diff = getDiff(before, after, 'json');
  expect(diff).toEqual(resultData);
});

test('Ini test', () => {
  const before = path.join(fixtures, 'iniBefore.ini');
  const after = path.join(fixtures, 'iniAfter.ini');
  const diff = getDiff(before, after, 'json');
  expect(diff).toEqual(resultData);
});

test('Plain test', () => {
  const plainResult = fs.readFileSync(path.join(fixtures, 'plainResult'), 'utf8');
  const before = path.join(fixtures, 'plainBefore.json');
  const after = path.join(fixtures, 'plainAfter.json');
  const diff = getDiff(before, after, 'plain');
  expect(diff).toBe(plainResult);
});
