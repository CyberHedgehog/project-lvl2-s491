import _ from 'lodash';

const valueToString = (value, tab) => {
  if (value instanceof Object) {
    const [key] = Object.keys(value);
    return `{\n${tab}    ${key}: ${value[key]}\n  ${tab}}`;
  }
  return `${value}`;
};

const builder = {
  unchanged: (node, tab) => (`${tab}  ${node.name}: ${valueToString(node.value, tab)}`),
  changed: (node, tab) => (`${tab}+ ${node.name}: ${valueToString(node.changedTo, tab)}\n${tab}- ${node.name}: ${valueToString(node.changedFrom)}`),
  removed: (node, tab) => (`${tab}- ${node.name}: ${valueToString(node.value, tab)}`),
  added: (node, tab) => (`${tab}+ ${node.name}: ${valueToString(node.value, tab)}`),
};

const formatter = (tree, depth) => {
  const tab = '  '.repeat(depth);
  const arr = tree.reduce((acc, node) => {
    const { state, children, name } = node;
    if (!children) {
      return [...acc, builder[state](node, tab)];
    }
    return [...acc, `${tab}  ${name}: ${formatter(children, depth + 1)}`];
  }, []);
  const result = ['{', ...arr, '}'].join('\n');
  return result;
};

const render = data => formatter(data, 1);
export default render;
