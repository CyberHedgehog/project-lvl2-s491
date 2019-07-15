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
  changed: (node, name) => `Property '${name}' was updated. From ${getValue(node.oldValue)} to ${getValue(node.newValue)}`,
  removed: (node, name) => `Property '${name}' was removed`,
  added: (node, name) => `Property '${name}' was added with value: ${getValue(node.value)}`,
  unchanged: () => {},
};

const render = (tree, parents = []) => {
  const result = tree.reduce((acc, node) => {
    const {
      name,
      children,
      type,
      hasChildren,
    } = node;
    if (hasChildren) {
      return [...acc, render(children, [...parents, name])];
    }
    return [...acc, builder[type](node, [...parents, name].join('.'))];
  }, []);
  return result.filter(v => v).join('\n');
};

export default render;
