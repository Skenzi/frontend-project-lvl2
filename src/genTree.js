import _ from 'lodash';

const genTree = (dataBefore, dataAfter) => {
  const unionKeys = _.union(Object.keys(dataBefore), Object.keys(dataAfter));
  const sortedKeys = _.sortBy(unionKeys);

  const addElemenet = (key) => {
    if (!_.has(dataBefore, key)) {
      return { key, valueAfter: dataAfter[key], status: 'added' };
    }
    if (!_.has(dataAfter, key)) {
      return { key, valueBefore: dataBefore[key], status: 'deleted' };
    }
    if (_.isObject(dataBefore[key]) && _.isObject(dataAfter[key])) {
      return { key, children: genTree(dataBefore[key], dataAfter[key]), status: 'nested' };
    }
    if (dataBefore[key] !== dataAfter[key]) {
      return {
        key, valueBefore: dataBefore[key], valueAfter: dataAfter[key], status: 'changed',
      };
    }
    return { key, valueAfter: dataAfter[key], status: 'unchanged' };
  };
  return sortedKeys.map(addElemenet);
};

export default genTree;
