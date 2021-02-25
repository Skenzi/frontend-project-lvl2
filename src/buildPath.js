import path from 'path';

const getPathToFile = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  return fullPath;
};

export default getPathToFile;
