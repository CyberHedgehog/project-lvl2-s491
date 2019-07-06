import _ from 'lodash';

// const builder = {
//   unchanged: node => ([{ [`  ${node.name}`]: valueConstructor(node.value) }]),
//   changed: node => ([`+ ${node.name}`: node.changedTo, [`- ${node.name}`]: (node.changedFrom) }),
//   removed: node => ([{ [`- ${node.name}`]: valueConstructor(node.value) }]),
//   added: node => ([{ [`+ ${node.name}`]: valueConstructor(node.value) }]),
// };

// const formatter = (tree) => {
//   const result = tree.reduce((acc, node) => {
//     const { state, name, children } = node;
//     if (!children) {
//       return [...acc, ...builder[state](node, formatter)];
//     }
//     return [...acc, { [`  ${name}`]: formatter(children) }];
//   }, []);
//   return _(result).toJSON();
// };

const render = data => JSON.stringify(_(data).toJSON());
export default render;
