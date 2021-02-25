import _ from 'lodash';

const pathToKey = (path, key) => (path === '' ? key : `${path}.${key}`);
const renderValue = (value) => (_.isObject(value) ? '[complex value]' : (typeof value === 'string') ? `'${value}'` : value);

const toPlain = (tree) => {
  const iter = (dataTree, path) => {
    const result = dataTree
      .filter((node) => node.status !== 'unchanged')
      .map((node) => {
        const {
          key, valueAfter, valueBefore, status, childrens,
        } = node;
        if (status === 'added') {
          return `Property '${pathToKey(path, key)}' was added with value: ${renderValue(valueAfter)}`;
        }
        if (status === 'changed') {
          return `Property '${pathToKey(path, key)}' was updated. From ${renderValue(valueBefore)} to ${renderValue(valueAfter)}`;
        }
        if (status === 'deleted') {
          return `Property '${pathToKey(path, key)}' was removed`;
        }
        return iter(childrens, pathToKey(path, key));
      });

    return result.join('\n');
  };
  return iter(tree, '');
};

export default toPlain;
