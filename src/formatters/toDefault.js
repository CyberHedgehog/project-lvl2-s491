import _ from 'lodash';

const builder = {
  unchanged: node => (`  ${node.name}: ${node.value }`),
  changed: node => (`+ ${node.name}: ${node.changedTo}\n    - ${node.name}: ${node.changedFrom }`),
  removed: node => (`- ${node.name}: ${node.value }`),
  added: node => (`+ ${node.name}: ${node.value }`),
};

const formatter = (tree) => {
  const arr = tree.reduce((acc, node) => {
    const { state, name, children } = node;
    if (!children) {
      return [...acc,`    ${builder[state](node)}`];
    }
    const chld = formatter(children);
    console.log(chld);
    return [...acc, `  ${name}: ${chld}`];
  }, []);
  const result = ['{', ...arr, '  }'].join('\n');
  // console.log(result);
  return result;
};

const render = data => formatter(data);
export default render;
