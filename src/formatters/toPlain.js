const getValue = value => (value instanceof Object ? '[complex value]' : value);
const builder = {
  changed: (node, path) => `Property '${path}.${node.name}' was updated. From '${getValue(node.changedFrom)}' to '${getValue(node.changedTo)}'`,
  removed: (node, path) => `Property '${path}.${node.name}' was removed.`,
  added: (node, path) => `Property '${path}.${node.name}' was added with value: '${getValue(node.value)}'`,
  unchanged: () => {},
};

const render = (tree, parents = []) => {
  const result = tree.reduce((acc, node) => {
    const { name, children, state } = node;
    if (!children) {
      return [...acc, builder[state](node, parents.join('.'))];
    }
    return [...acc, render(node.children, [...parents, name])];
  }, []);
  return result.filter(v => v).join('\n');
};

export default render;
