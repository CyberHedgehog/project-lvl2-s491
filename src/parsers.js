// import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';
// import path from 'path';

const parsers = {
  '.yml': yaml.safeLoad,
  '.json': JSON.parse,
  '.ini': ini.parse,
};

export default (data, fileExtention) => parsers[fileExtention](data);
