import _ from 'lodash';

const genTree = (dataFile1, dataFile2) => {
  const keys1 = Object.keys(dataFile1);
  const keys2 = Object.keys(dataFile2);
  const unionKeys = _.sortBy(_.union(keys1, keys2));

  const addElemenet = (key) => {
    if (!_.has(dataFile1, key)) {
      return { key, afterValue: dataFile2[key], status: 'added' };
    }
    if (!_.has(dataFile2, key)) {
      return { key, beforeValue: dataFile1[key], status: 'deleted' };
    }
    if (_.isObject(dataFile1[key]) && _.isObject(dataFile2[key])) {
      return { key, childrens: genTree(dataFile1[key], dataFile2[key]), status: 'nested' };
    }
    if (dataFile1[key] !== dataFile2[key]) {
      return {
        key, beforeValue: dataFile1[key], afterValue: dataFile2[key], status: 'changed',
      };
    }
    return { key, afterValue: dataFile2[key], status: 'unchanged' };
  };
  return unionKeys.map(addElemenet);
};

export default genTree;
