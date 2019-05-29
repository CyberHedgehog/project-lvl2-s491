import fs from 'fs';

const getDiff = (firstPath, secondPath) => {
  const firstData = JSON.parse(fs.readFileSync(firstPath, 'utf-8'));
  const secondData = JSON.parse(fs.readFileSync(secondPath, 'utf-8'));
  const fistFileKeys = Object.keys(firstData);
  const allKeys = Object.keys(secondData).reduce((acc, key) => {
    if (fistFileKeys.includes(key)) {
      return acc;
    }
    return [...acc, key];
  }, fistFileKeys);
  const result = allKeys.reduce((acc, key) => {
    const firstValue = firstData[key];
    const secondValue = secondData[key];
    if (!firstValue) {
      return { ...acc, [`+ ${key}`]: secondValue };
    }
    if (!secondValue) {
      return { ...acc, [`- ${key}`]: firstValue };
    }
    if (firstValue !== secondValue) {
      return { ...acc, [`+ ${key}`]: secondValue, [`- ${key}`]: firstValue };
    }
    return { ...acc, [key]: firstValue };
  }, {});
  return JSON.stringify(result);
};

// const test = getDiff('__tests__/__fixtures__/file1.json', '__tests__/__fixtures__/file2.json');
// console.log(JSON.parse(test));

export default getDiff;
