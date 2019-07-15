import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parse from './parsers';
import render from './formatters';


const getAst = (firstData, secondData) => {
  const allKeys = _.union(Object.keys(firstData), Object.keys(secondData));
  const result = allKeys.reduce((acc, key) => {
    if (!_.has(firstData, key)) {
      const newObj = {
        type: 'added',
        hasChildren: false,
        name: key,
        value: secondData[key],
      };
      return [...acc, newObj];
    }
    if (!_.has(secondData, key)) {
      const newObj = {
        type: 'removed',
        hasChildren: false,
        name: key,
        value: firstData[key],
      };
      return [...acc, newObj];
    }
    if (firstData[key] instanceof Object && secondData[key] instanceof Object) {
      return [...acc, {
        type: 'unchanged',
        hasChildren: true,
        name: key,
        children: getAst(firstData[key], secondData[key]),
      }];
    }
    if (firstData[key] !== secondData[key]) {
      const newObj = {
        type: 'changed',
        hasChildren: false,
        name: key,
        oldValue: firstData[key],
        newValue: secondData[key],
      };
      return [...acc, newObj];
    }
    return [...acc, {
      type: 'unchanged',
      hasChildren: false,
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
  const firstParsedData = parse(firstFileData, firstFileExt);
  const secondParsedData = parse(secondFiledata, secondFileExt);
  const ast = getAst(firstParsedData, secondParsedData);
  return render(ast, format);
};

export default getDiff;
