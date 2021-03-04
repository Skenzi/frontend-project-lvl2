import renderToStylishFormat from './stylish.js';
import renderToPlainFormat from './plain.js';
import renderToJsonFormat from './json.js';

const formatNames = {
  stylish: renderToStylishFormat,
  plain: renderToPlainFormat,
  json: renderToJsonFormat,
};

const render = (tree, formatName) => formatNames[formatName](tree);

export default render;
