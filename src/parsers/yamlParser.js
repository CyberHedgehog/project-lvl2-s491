import fs from 'fs';
import yaml from 'js-yaml';

export default (path) => {
  const data = fs.readFileSync(path, 'utf-8');
  return yaml.safeLoad(data);
};
