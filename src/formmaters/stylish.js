import _ from 'lodash';

const space = (depth) => ' '.repeat(depth);

const stringify = (element, depth) => {
  if (!(_.isObject(element))) {
    return element;
  }
  const keys = Object.keys(element);
  const result = keys.map((key) => `${space(depth + 8)}${key}: ${stringify(element[key], depth + 4)}`);
  return `{\n${result.join('\n')}\n${space(depth + 4)}}`;
};

const toStylish = (tree) => {
  const renderTree = (nodes, depth) => {
    const result = nodes.map((node) => {
      if (node.status === 'added') {
        return `${space(depth + 2)}+ ${node.key}: ${stringify(node.valueAfter, depth)}`;
      }
      if (node.status === 'changed') {
        return `${space(depth + 2)}- ${node.key}: ${stringify(node.valueBefore, depth)}\n${space(depth + 2)}+ ${node.key}: ${stringify(node.valueAfter, depth)}`;
      }
      if (node.status === 'deleted') {
        return `${space(depth + 2)}- ${node.key}: ${stringify(node.valueBefore, depth)}`;
      }
      if (node.status === 'nested') {
        return `${space(depth + 4)}${node.key}: {\n${renderTree(node.children, depth + 4)}\n${space(depth + 4)}}`;
      }
      return `${space(depth + 4)}${node.key}: ${stringify(node.valueAfter, depth)}`;
    });
    return result.join('\n');
  };

  return `{\n${renderTree(tree, 0)}\n}`;
};

export default toStylish;
