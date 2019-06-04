import getDiff from '../src/utils/getDiff';
import parsers from '../src/utils/parsers';

const resultData = JSON.stringify(parsers('__tests__/__fixtures__/result.json'), null, ' ');

test('Empty JSON', () => {
  expect(getDiff('__tests__/__fixtures__/empty.json', '__tests__/__fixtures__/empty2.json')).toEqual('{}');
});

test('JSON test', () => {
  const diff = getDiff('__tests__/__fixtures__/jsonBefore.json', '__tests__/__fixtures__/jsonAfter.json');
  expect(diff).toEqual(resultData);
});

test('Yaml test', () => {
  const diff = getDiff('__tests__/__fixtures__/ymlBefore.yml', '__tests__/__fixtures__/ymlAfter.yml');
  expect(diff).toEqual(resultData);
});

test('Ini test', () => {
  const diff = getDiff('__tests__/__fixtures__/iniBefore.ini', '__tests__/__fixtures__/iniAfter.ini');
  expect(diff).toEqual(resultData);
});
