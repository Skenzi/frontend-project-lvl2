import fs from 'fs';

const parseFile = (file) => JSON.parse(fs.readFileSync(file));

export default parseFile;
