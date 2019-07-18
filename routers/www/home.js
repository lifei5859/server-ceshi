const renderList = require('../../libs/indexHome');

const list = 'demo_list';
const tableConf = [
    {title: 'demo', name: 'demo', type:'panel-info'},
    {title: '小项目', name: 'project', type:'panel-default'},
    {title: '组件', name: 'module', type:'panel-success'}
];
const pageType = 'home';

const title = '我的demo汇--主页';

module.exports = renderList(tableConf, list, title, pageType);
