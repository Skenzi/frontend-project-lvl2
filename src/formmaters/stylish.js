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
  const iter = (dataTree, depth) => {
    const result = dataTree.map((node) => {
      const {
        key, valueAfter, valueBefore, status, childrens,
      } = node;
      if (status === 'added') {
        return `${space(depth + 2)}+ ${key}: ${stringify(valueAfter, depth)}`;
      }
      if (status === 'changed') {
        return `${space(depth + 2)}- ${key}: ${stringify(valueBefore, depth)}\n${space(depth + 2)}+ ${key}: ${stringify(valueAfter, depth)}`;
      }
      if (status === 'deleted') {
        return `${space(depth + 2)}- ${key}: ${stringify(valueBefore, depth)}`;
      }
      if (status === 'nested') {
        return `${space(depth + 4)}${key}: {\n${iter(childrens, depth + 4)}\n${space(depth + 4)}}`;
      }
      return `${space(depth + 4)}${key}: ${stringify(valueAfter, depth)}`;
    });
    return result.join('\n');
  };

  return `{\n${iter(tree, 0)}\n}`;
};

export default toStylish;
