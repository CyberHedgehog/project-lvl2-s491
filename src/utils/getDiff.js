import _ from 'lodash';
import parser from './parsers';

const parse = (firstData, secondData) => {
  const allKeys = _.uniq(Object.keys(firstData).concat(Object.keys(secondData)));
  const result = allKeys.reduce((acc, key) => {
    if (!_.has(firstData, key)) {
      const newObj = {
        name: `+ ${key}`,
        value: secondData[key],
      };
      return [...acc, newObj];
    }
    if (!_.has(secondData, key)) {
      const newObj = {
        name: `- ${key}`,
        value: firstData[key],
      };
      return [...acc, newObj];
    }
    if (firstData[key] instanceof Object && secondData[key] instanceof Object) {
      return [...acc, { name: `  ${key}`, children: parse(firstData[key], secondData[key]) }];
    }
    if (firstData[key] !== secondData[key]) {
      const before = {
        name: `- ${key}`,
        value: firstData[key],
      };
      const after = {
        name: `+ ${key}`,
        value: secondData[key],
      };
      return [...acc, after, before];
    }
    return [...acc, {
      name: `  ${key}`,
      value: firstData[key],
    }];
  }, []);
  return result;
};

const render = (tree) => {
  const result = tree.reduce((acc, node) => {
    const { name, value, children } = node;
    if (!children) {
      return { ...acc, [name]: value };
    }
    return { ...acc, [name]: render(children) };
  }, {});
  return result;
};

const getDiff = (firstPath, secondPath) => {
  const ast = parse(parser(firstPath), parser(secondPath));
  return JSON.stringify(render(ast), null, ' ');
};

export default getDiff;
