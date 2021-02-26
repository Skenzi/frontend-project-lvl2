import _ from 'lodash';

const genTree = (dataFile1, dataFile2) => {
  const unionKeys = _.union(Object.keys(dataFile1), Object.keys(dataFile2));
  const sortedKeys = _.sortBy(unionKeys);

  const addElemenet = (key) => {
    if (!_.has(dataFile1, key)) {
      return { key, valueAfter: dataFile2[key], status: 'added' };
    }
    if (!_.has(dataFile2, key)) {
      return { key, valueBefore: dataFile1[key], status: 'deleted' };
    }
    if (_.isObject(dataFile1[key]) && _.isObject(dataFile2[key])) {
      return { key, children: genTree(dataFile1[key], dataFile2[key]), status: 'nested' };
    }
    if (dataFile1[key] !== dataFile2[key]) {
      return {
        key, valueBefore: dataFile1[key], valueAfter: dataFile2[key], status: 'changed',
      };
    }
    return { key, valueAfter: dataFile2[key], status: 'unchanged' };
  };
  return sortedKeys.map(addElemenet);
};

export default genTree;
