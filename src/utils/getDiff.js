import _ from 'lodash';
import parser from './parsers';

const getDiff = (firstPath, secondPath) => {
  const firstData = parser(firstPath);
  const secondData = parser(secondPath);
  const allKeys = _.uniq(Object.keys(firstData).concat(Object.keys(secondData)));
  const result = allKeys.reduce((acc, key) => {
    const firstValue = firstData[key];
    const secondValue = secondData[key];
    if (!_.has(firstData, key)) {
      return { ...acc, [`+ ${key}`]: secondValue };
    }
    if (!_.has(secondData, key)) {
      return { ...acc, [`- ${key}`]: firstValue };
    }
    if (firstValue !== secondValue) {
      return { ...acc, [`+ ${key}`]: secondValue, [`- ${key}`]: firstValue };
    }
    return { ...acc, [`  ${key}`]: firstValue };
  }, {});
  return result;
};

export default getDiff;
