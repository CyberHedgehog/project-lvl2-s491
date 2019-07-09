import toJSON from './toJSON';
import toObjectView from './toObjectView';
import toPlain from './toPlain';

const render = {
  plain: toPlain,
  json: toJSON,
  objectview: toObjectView,
};

export default (data, format) => render[format](data);
