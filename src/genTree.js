import _ from 'lodash';

const genTree = (fileData1, fileData2) => {
  const unionKeys = _.union(Object.keys(fileData1), Object.keys(fileData2));
  const sortedKeys = _.sortBy(unionKeys);

  const addElemenet = (key) => {
    if (!_.has(fileData1, key)) {
      return { key, valueAfter: fileData2[key], status: 'added' };
    }
    if (!_.has(fileData2, key)) {
      return { key, valueBefore: fileData1[key], status: 'deleted' };
    }
    if (_.isObject(fileData1[key]) && _.isObject(fileData2[key])) {
      return { key, children: genTree(fileData1[key], fileData2[key]), status: 'nested' };
    }
    if (fileData1[key] !== fileData2[key]) {
      return {
        key, valueBefore: fileData1[key], valueAfter: fileData2[key], status: 'changed',
      };
    }
    return { key, valueAfter: fileData2[key], status: 'unchanged' };
  };
  return sortedKeys.map(addElemenet);
};

export default genTree;
