import toStylish from './stylish.js';
import toPlain from './plain.js';
import toJson from './json.js';

const formmater = (tree, formatName) => {
  if (formatName === 'stylish') {
    return toStylish(tree);
  }
  if (formatName === 'plain') {
    return toPlain(tree);
  }
  if (formatName === 'json') {
    return toJson(tree);
  }
  return 0;
};

export default formmater;
