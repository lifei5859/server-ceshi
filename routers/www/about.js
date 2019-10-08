const renderList = require('../../libs/indexHome');

const list = 'about';
const tableConf = [
    {title: '关于本人', name: 'me', type:'panel-info'},
    {title: '关于本站', name: 'website', type:'panel-default'}
];
const pageType = 'home';

const title = '我的demo汇--关于';

module.exports = renderList(tableConf, list, title, pageType);
