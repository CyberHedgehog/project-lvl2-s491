import fs from 'fs';

const getDiff = (firstPath, secondPath) => {
  const firstData = JSON.parse(fs.readFileSync(firstPath, 'utf-8'));
  const secondData = JSON.parse(fs.readFileSync(secondPath, 'utf-8'));
  const result = Object.keys(secondData).reduce((acc, key) => {
    const firstFileProp = firstData[key];
    if (!firstFileProp) {
      return { ...acc, [`+ ${key}`]: secondData[key] };
    }
    if (firstFileProp === secondData[key]) {
      return { ...acc, [key]: secondData[key] };
    }
    return { ...acc, [`+ ${key}`]: secondData[key], [`- ${key}`]: firstData[key] };
  }, {});
  return result;
};

const test = getDiff('__tests__/__fixtures__/file1.json', '__tests__/__fixtures__/file2.json');
console.log(test);
