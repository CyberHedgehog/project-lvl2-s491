const valueToString = (value, tab) => {
  if (value instanceof Object && !Array.isArray(value)) {
    const [key] = Object.keys(value);
    return `{\n${tab}    ${key}: ${value[key]}\n  ${tab}}`;
  }
  return `${value}`;
};

const builder = {
  unchanged: (node, tab) => (`${tab}  ${node.name}: ${valueToString(node.value, tab)}`),
  changed: (node, tab) => (`${tab}+ ${node.name}: ${valueToString(node.changedTo, tab)}\n${tab}- ${node.name}: ${valueToString(node.changedFrom, tab)}`),
  removed: (node, tab) => (`${tab}- ${node.name}: ${valueToString(node.value, tab)}`),
  added: (node, tab) => (`${tab}+ ${node.name}: ${valueToString(node.value, tab)}`),
};

const getTab = depth => '  '.repeat(depth);

const build = (tree, depth) => {
  if (tree.length === 0) {
    return '{}';
  }
  const typeTabsCount = depth - 1;
  const tab = depth > 1 ? getTab(depth + typeTabsCount) : getTab(depth);
  const closingTab = depth > 1 ? getTab(depth + typeTabsCount - 1) : '';
  const resultTree = tree.reduce((acc, node) => {
    const { type, children, name } = node;
    if (type === 'parent') {
      return [...acc, `${tab}  ${name}: ${build(children, depth + 1)}`];
    }
    return [...acc, builder[type](node, `${tab}`)];
  }, []);
  const result = ['{', ...resultTree, `${closingTab}}`].join('\n');
  return result;
};

const render = data => build(data, 1);
export default render;
