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

const getTab = repeats => '  '.repeat(repeats);

const build = (tree, tabCount) => {
  if (tree.length === 0) {
    return '{}';
  }
  const tab = getTab(tabCount);
  const childrenTab = `${getTab(tabCount)}  `;
  const nonChildrenTab = getTab(tabCount + 1);
  const arr = tree.reduce((acc, node) => {
    const { type, children, name } = node;
    if (!children) {
      return [...acc, builder[type](node, nonChildrenTab)];
    }
    return [...acc, `${childrenTab}  ${name}: ${build(children, tabCount + 2)}`];
  }, []);
  const result = ['{', ...arr, `${tab}}`].join('\n');
  return result;
};

const render = data => build(data, 0);
export default render;
