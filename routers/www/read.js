const renderList = require('../../libs/indexHome');

const list = 'article';
const tableConf = [
    {title: '相信技术的力量', name: 'technology', type:'panel-info'},
    {title: '人生不止技术', name: 'literature', type:'panel-default'},
    {title: '好像很有道理', name: 'tendency', type:'panel-success'}
];
const explain = '这里，主要是图书的分享，不提供pdf哦，本人平时看的书，看完之后觉得值得推荐的，就拿到这里推荐给大家。'
const pageType = 'read';

const title = '我的demo汇--阅读';

module.exports = renderList(tableConf, list, title, pageType, explain);