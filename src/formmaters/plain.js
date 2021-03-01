import _ from 'lodash';

const buildPathToKey = (path, key) => (path === '' ? key : `${path}.${key}`);

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return (typeof value === 'string') ? `'${value}'` : value;
};

const renderToPlainFormat = (tree) => {
  const convertingTree = (nodes, path) => {
    const result = nodes
      .filter((node) => node.status !== 'unchanged')
      .map((node) => {
        const {
          key, valueAfter, valueBefore, status, children,
        } = node;
        switch (status) {
          case 'added':
            return `Property '${buildPathToKey(path, key)}' was added with value: ${stringify(valueAfter)}`;
          case 'changed':
            return `Property '${buildPathToKey(path, key)}' was updated. From ${stringify(valueBefore)} to ${stringify(valueAfter)}`;
          case 'deleted':
            return `Property '${buildPathToKey(path, key)}' was removed`;
          default:
            return convertingTree(children, buildPathToKey(path, key));
        }
      });

    return result.join('\n');
  };
  return convertingTree(tree, '');
};

export default renderToPlainFormat;
