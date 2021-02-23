import path from 'path';

const getPathToFile = (filepath) => {
  const workDir = process.cwd();
  const getPath = path.resolve(workDir, filepath);
  return getPath;
};

export default getPathToFile;
