import _ from 'lodash';

const pathToKey = (path, key) => (path === '' ? key : `${path}.${key}`);

const renderValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return (typeof value === 'string') ? `'${value}'` : value;
};

const toPlain = (tree) => {
  const iter = (nodes, path) => {
    const result = nodes
      .filter((node) => node.status !== 'unchanged')
      .map((node) => {
        const {
          key, valueAfter, valueBefore, status, children,
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
        return iter(children, pathToKey(path, key));
      })
      .join('\n');

    return result;
  };
  return iter(tree, '');
};

export default toPlain;
