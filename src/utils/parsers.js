import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';
import path from 'path';

const yamlParser = data => yaml.safeLoad(data);
const iniParser = data => ini.parse(data);

const parsers = {
  '.yml': yamlParser,
  '.json': JSON.parse,
  '.ini': iniParser,
};

export default (filePath) => {
  const data = fs.readFileSync(filePath, 'utf-8');
  const fileExtnesion = path.extname(filePath);
  return parsers[fileExtnesion](data);
};
