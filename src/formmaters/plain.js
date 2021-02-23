import _ from 'lodash';

const pathToKey = (path, key) => (path === '' ? key : `${path}.${key}`);

const toPlain = (tree) => {
  const iter = (node, path) => {
    const result = node.map((branche) => {
      const {
        key, afterValue, beforeValue, status, childrens,
      } = branche;
      if (status === 'added') {
        const value = _.isObject(afterValue) ? '[complex value]' : afterValue;
        return `Property '${pathToKey(path, key)}' was added with value: '${value}'`;
      }
      if (status === 'changed') {
        const value2 = _.isObject(afterValue) ? '[complex value]' : afterValue;
        const value1 = _.isObject(beforeValue) ? '[complex value]' : beforeValue;
        return `Property '${pathToKey(path, key)}' was updated. From '${value1}' to '${value2}'`;
      }
      if (status === 'deleted') {
        return `Property '${pathToKey(path, key)}' was removed`;
      }
      if (status === 'nested') {
        return iter(childrens, pathToKey(path, key));
      }
    });
    return result.join('\n');
  };
  return `${iter(tree, '')}`;
};

export default toPlain;
