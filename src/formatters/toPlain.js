const getValue = (value) => {
  if (value instanceof Object) {
    return '[complex value]';
  }
  if (typeof (value) === 'string') {
    return `'${value}'`;
  }
  return value;
};

const builder = {
  changed: (node, name) => `Property '${name}' was updated. From ${getValue(node.changedFrom)} to ${getValue(node.changedTo)}`,
  removed: (node, name) => `Property '${name}' was removed`,
  added: (node, name) => `Property '${name}' was added with value: ${getValue(node.value)}`,
  unchanged: () => {},
};

const render = (tree, parents = []) => {
  const result = tree.reduce((acc, node) => {
    const { name, children, state } = node;
    if (!children) {
      return [...acc, builder[state](node, [...parents, name].join('.'))];
    }
    return [...acc, render(node.children, [...parents, name])];
  }, []);
  return result.filter(v => v).join('\n');
};

export default render;
