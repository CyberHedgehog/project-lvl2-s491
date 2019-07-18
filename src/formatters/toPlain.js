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
  changed: (node, fullName) => `Property '${fullName}' was updated. From ${getValue(node.oldValue)} to ${getValue(node.newValue)}`,
  removed: (node, fullName) => `Property '${fullName}' was removed`,
  added: (node, fullName) => `Property '${fullName}' was added with value: ${getValue(node.value)}`,
  unchanged: () => {},
  compound: (node, fullName, fn, parents) => fn(node.children, [...parents, node.name]),
};

const render = (tree, parents = []) => {
  const result = tree.map((node) => {
    const { name, type } = node;
    return builder[type](node, [...parents, name].join('.'), render, parents);
  });
  return result.filter(v => v).join('\n');
};

export default render;
