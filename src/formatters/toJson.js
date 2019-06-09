const builder = {
  unchanged: node => ({ [`  ${node.name}`]: node.value }),
  changed: node => ({ [`+ ${node.name}`]: node.changedTo, [`- ${node.name}`]: node.changedFrom }),
  removed: node => ({ [`- ${node.name}`]: node.value }),
  added: node => ({ [`+ ${node.name}`]: node.value }),
};

const render = (tree) => {
  const result = tree.reduce((acc, node) => {
    const { state, name, children } = node;
    if (!children) {
      return { ...acc, ...builder[state](node) };
    }
    return { ...acc, [`  ${name}`]: render(children) };
  }, {});
  return result;
};

export default render;
