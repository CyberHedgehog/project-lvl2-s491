import _ from 'lodash';

const render = data => JSON.stringify(_(data).toJSON());
export default render;
