import _ from 'lodash';
import fs from 'fs';
import path from 'path';

const fullPath = (filepath) => {
    const workDir = process.cwd();
    const fullPath = path.resolve(`${workDir}`, `src/${filepath}`);
    return fullPath;
}

const genDiff = (filepath1, filepath2) => {
    const fullPath1 = fullPath(filepath1);
    const fullPath2 = fullPath(filepath2);
    const obj1 = JSON.parse(fs.readFileSync(fullPath1));
    const obj2 = JSON.parse(fs.readFileSync(fullPath2));
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    const keys = _.union(keys1, keys2);
    const result = keys.map((key) => {
        if (!_.has(obj1, key)) {
            return `+ ${key}: ${obj2[key]}`;
        }
        if (!_.has(obj2, key)) {
            return `- ${key}: ${obj1[key]}`;
        }
        if (obj1[key] === obj2[key]) {
            return `${key}: ${obj2[key]}`;
        }
        if (obj1[key] !== obj2[key]) {
            return `- ${key}: ${obj1[key]}\n+ ${key}: ${obj2[key]}`;
        }
    });
    return result.join('\n');
};

export {genDiff};