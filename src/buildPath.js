import path from 'path';

const fullPath = (filepath) => {
  const workDir = process.cwd();
  const newPath = path.resolve(workDir, `src/${filepath}`);
  return newPath;
};

export default fullPath;
