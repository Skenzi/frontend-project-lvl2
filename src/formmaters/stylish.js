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
      const {
        key, valueAfter, valueBefore, status, children,
      } = node;
      switch (status) {
        case 'added':
          return `${space(depth + 2)}+ ${key}: ${stringify(valueAfter, depth)}`;
        case 'changed':
          return `${space(depth + 2)}- ${key}: ${stringify(valueBefore, depth)}\n${space(depth + 2)}+ ${key}: ${stringify(valueAfter, depth)}`;
        case 'nested':
          return `${space(depth + 4)}${key}: {\n${renderTree(children, depth + 4)}\n${space(depth + 4)}}`;
        case 'deleted':
          return `${space(depth + 2)}- ${key}: ${stringify(valueBefore, depth)}`;
        default:
          return `${space(depth + 4)}${key}: ${stringify(valueAfter, depth)}`;
      }
    });
    return result.join('\n');
  };

  return `{\n${renderTree(tree, 0)}\n}`;
};

export default toStylish;
