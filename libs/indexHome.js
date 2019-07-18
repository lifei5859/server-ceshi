const Router = require('koa-router');
const path = require('path');
const {HTTP_HOST, HTTP_UPLOAD} = require('../config');
const common = require('./common');
const fs = require('fs');
const moment = require('moment');

module.exports = function (pageConf, list, title, page) {
    let router = new Router();

    const pageTypes = {
        '/': '主页',
        '/read': '阿飞读书会',
        '/about': '关于',
    };
    router.get('/', async ctx => {
        let data = await ctx.db.query(`SELECT * FROM ${list}`);
        // tableConf.forEach(async item => {
        //     console.log(item)
        //     if (item.type === 'select') {
        //         item.vals = await ctx.db.query(item.from);
        //         console.log(item)
        //     }
        // });
        await ctx.render('index', {
            data,
            pageConf,
            title,
            page,
            pageTypes
        });
    });

    // router.post('/list', async ctx => {
    //     let req = ctx.request.fields;
    //     console.log(req)
    //     let keys = [];
    //     let values =[];
    //     tableConf.forEach(({name, type}) => {
    //         keys.push(name);
    //         if (type === 'file') {
    //             values.push(path.basename(req[name][0].path));
    //         } else if (type === 'date') {
    //             values.push(moment().valueOf(req[name]));
    //         } else {
    //             values.push(req[name]);
    //         }
    //     });
    //     await ctx.db.query(`INSERT INTO ${list} (${keys.join(',')}) VALUES(${keys.map(key => '?').join(',')})`,  values);
    //     ctx.body = common.resJson(1, '添加成功');
    // });



    return router.routes();
}
