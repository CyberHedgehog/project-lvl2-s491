import getDiff from '../src/utils/getDiff';

const testJSON = '{ "param": "one", "+ param2": "two", "+ param3": "thre", "- param3": "three", "- param4": "four" }';

test('Empty JSON', () => {
  expect(getDiff('__tests__/__fixtures__/empty.json', '__tests__/__fixtures__/empty2.json')).toBe('{}');
});

test('Not empty JSON', () => {
  const diff = getDiff('__tests__/__fixtures__/file1.json', '__tests__/__fixtures__/file2.json');
  expect(JSON.parse(diff)).toBe(JSON.parse(testJSON));
});
