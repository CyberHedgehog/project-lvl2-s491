import _ from 'lodash';
import parser from './parsers';
import renderToJson from '../formatters/toJson';
import renderToPlain from '../formatters/toPlain';

const parse = (firstData, secondData) => {
  const allKeys = _.uniq(Object.keys(firstData).concat(Object.keys(secondData)));
  const result = allKeys.reduce((acc, key) => {
    if (!_.has(firstData, key)) {
      const newObj = {
        state: 'added',
        name: key,
        value: secondData[key],
      };
      return [...acc, newObj];
    }
    if (!_.has(secondData, key)) {
      const newObj = {
        state: 'removed',
        name: key,
        value: firstData[key],
      };
      return [...acc, newObj];
    }
    if (firstData[key] instanceof Object && secondData[key] instanceof Object) {
      return [...acc, { state: 'has children', name: key, children: parse(firstData[key], secondData[key]) }];
    }
    if (firstData[key] !== secondData[key]) {
      const newObj = {
        state: 'changed',
        name: key,
        changedFrom: firstData[key],
        changedTo: secondData[key],
      };
      return [...acc, newObj];
    }
    return [...acc, {
      state: 'unchanged',
      name: key,
      value: firstData[key],
    }];
  }, []);
  return result;
};

const getDiff = (firstPath, secondPath) => {
  const ast = parse(parser(firstPath), parser(secondPath));
  console.log(renderToPlain(ast));
  return JSON.stringify(renderToJson(ast), null, ' ');
};

export default getDiff;
