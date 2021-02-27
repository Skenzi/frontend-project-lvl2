import renderToStylishFormat from './stylish.js';
import renderToPlainFormat from './plain.js';
import renderToJsonFormat from './json.js';

const formmater = (tree, formatName) => {
  if (formatName === 'stylish') {
    return renderToStylishFormat(tree);
  }
  if (formatName === 'plain') {
    return renderToPlainFormat(tree);
  }
  if (formatName === 'json') {
    return renderToJsonFormat(tree);
  }
  throw new Error(`Unexpected format: ${formatName}`);
};

export default formmater;
