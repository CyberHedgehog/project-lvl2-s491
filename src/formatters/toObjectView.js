import _ from 'lodash';

const valueToString = (value, tab) => {
  if (!(value instanceof Object) || Array.isArray(value)) {
    return `${value}`;
  }
  const [key] = Object.keys(value);
  return `{\n${tab}    ${key}: ${value[key]}\n  ${tab}}`;
};

const builder = {
  unchanged: (node, tab) => (`${tab}  ${node.name}: ${valueToString(node.value, tab)}`),
  changed: (node, tab) => [
    `${tab}+ ${node.name}: ${valueToString(node.newValue, tab)}`,
    `${tab}- ${node.name}: ${valueToString(node.oldValue, tab)}`,
  ],
  removed: (node, tab) => (`${tab}- ${node.name}: ${valueToString(node.value, tab)}`),
  added: (node, tab) => (`${tab}+ ${node.name}: ${valueToString(node.value, tab)}`),
  compound: (node, tab, fn, depth) => (`${tab}  ${node.name}: ${fn(node.children, depth + 1)}`),
};

const getTab = depth => '  '.repeat(depth);

const build = (tree, depth) => {
  if (tree.length === 0) {
    return '{}';
  }
  const typeTabsCount = depth - 1;
  const tab = depth > 1 ? getTab(depth + typeTabsCount) : getTab(depth);
  const closingTab = depth > 1 ? getTab(depth + typeTabsCount - 1) : '';
  const formattedTree = tree.map(node => builder[node.type](node, tab, build, depth));
  const flatTree = _.flatten(formattedTree);
  const result = ['{', ...flatTree, `${closingTab}}`].join('\n');
  return result;
};

const render = data => build(data, 1);
export default render;
