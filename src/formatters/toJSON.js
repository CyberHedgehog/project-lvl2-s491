import _ from 'lodash';

const valueConstructor = value => (value instanceof Object ? [value] : value);

const builder = {
  unchanged: node => ([{ [`  ${node.name}`]: valueConstructor(node.value) }]),
  changed: node => ([{ [`+ ${node.name}`]: valueConstructor(node.changedTo) }, { [`- ${node.name}`]: valueConstructor(node.changedFrom) }]),
  removed: node => ([{ [`- ${node.name}`]: valueConstructor(node.value) }]),
  added: node => ([{ [`+ ${node.name}`]: valueConstructor(node.value) }]),
};

const formatter = (tree) => {
  const result = tree.reduce((acc, node) => {
    const { state, name, children } = node;
    if (!children) {
      return [...acc, ...builder[state](node, formatter)];
    }
    return [...acc, { [`  ${name}`]: formatter(children) }];
  }, []);
  return _(result).toJSON();
};

const render = data => JSON.stringify(formatter(data));
export default render;
