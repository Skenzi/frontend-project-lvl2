import toStylish from './nested.js';
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
  throw new Error(`Sorry, but '${formatName}' wrong format.`);
};

export default formmater;
