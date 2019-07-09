import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parse from './parsers';
import render from './formatters';


const getAst = (firstData, secondData) => {
  const allKeys = _.union(Object.keys(firstData).concat(Object.keys(secondData)));
  const result = allKeys.reduce((acc, key) => {
    if (!_.has(firstData, key)) {
      const newObj = {
        type: 'added',
        name: key,
        value: secondData[key],
      };
      return [...acc, newObj];
    }
    if (!_.has(secondData, key)) {
      const newObj = {
        type: 'removed',
        name: key,
        value: firstData[key],
      };
      return [...acc, newObj];
    }
    if (firstData[key] instanceof Object && secondData[key] instanceof Object) {
      return [...acc, { type: 'has children', name: key, children: getAst(firstData[key], secondData[key]) }];
    }
    if (firstData[key] !== secondData[key]) {
      const newObj = {
        type: 'changed',
        name: key,
        changedFrom: firstData[key],
        changedTo: secondData[key],
      };
      return [...acc, newObj];
    }
    return [...acc, {
      type: 'unchanged',
      name: key,
      value: firstData[key],
    }];
  }, []);
  return result;
};

const getDiff = (firstPath, secondPath, format = 'objectview') => {
  const firstFileData = fs.readFileSync(firstPath, 'utf-8');
  const secondFiledata = fs.readFileSync(secondPath, 'utf-8');
  const firstFileExt = path.extname(firstPath);
  const secondFileExt = path.extname(secondPath);
  const ast = getAst(parse(firstFileData, firstFileExt), parse(secondFiledata, secondFileExt));
  return render(ast, format);
};

export default getDiff;
