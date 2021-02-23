import _ from 'lodash';

const space = (depth) => ' '.repeat(depth);

const stringify = (child, depth) => {
  if (!(_.isObject(child))) {
    return child;
  }
  const keys = Object.keys(child);
  const result = keys.map((key) => `\n${space(depth + 6)}${key}: ${stringify(child[key], depth)}\n${space(depth + 4)}`);
  return `{${result.join(`${space(depth)}`)}${space(depth + 4)}}`;
};

const toStylish = (tree) => {
  const iter = (node, depth) => {
    const result = node.map((branche) => {
      const {
        key, afterValue, beforeValue, status, childrens,
      } = branche;
      if (status === 'added') {
        return `${space(depth + 6)}+ ${key}: ${stringify(afterValue, depth)}`;
      }
      if (status === 'changed') {
        return `${space(depth + 6)}- ${key}: ${stringify(beforeValue, depth)}\n${space(depth)}${space(depth + 6)}+ ${key}: ${stringify(afterValue, depth)}`;
      }
      if (status === 'deleted') {
        return `${space(depth + 6)}- ${key}: ${stringify(beforeValue, depth)}`;
      }
      if (status === 'nested') {
        return `${space(depth + 4)}${key}: {\n${iter(childrens, depth)}\n${space(depth + 2)}}`;
      }
      return `${space(depth + 6)}${key}: ${stringify(afterValue, depth)}`;
    });
    return result.join('\n');
  };

  return `{\n${iter(tree, 0)}\n}`;
};

export default toStylish;
