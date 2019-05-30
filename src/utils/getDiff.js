import fs from 'fs';
import _ from 'lodash';

const getDiff = (firstPath, secondPath) => {
  const firstData = JSON.parse(fs.readFileSync(firstPath, 'utf-8'));
  const secondData = JSON.parse(fs.readFileSync(secondPath, 'utf-8'));
  const allKeys = _.uniq(Object.keys(firstData).concat(Object.keys(secondData)));
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
    return { ...acc, [`  ${key}`]: firstValue };
  }, {});
  return JSON.stringify(result);
};

export default getDiff;
