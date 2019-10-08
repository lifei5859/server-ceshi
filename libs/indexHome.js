const Router = require('koa-router');
const path = require('path');
const {HTTP_HOST, HTTP_UPLOAD} = require('../config');
const common = require('./common');
const fs = require('fs');
const moment = require('moment');

module.exports = function (pageConf, list, title, page, explain) {
    let router = new Router();

    const pageTypes = {
        '/': '主页',
        '/read': '阿飞读书会',
        '/about': '关于',
    };
    router.get('/', async ctx => {
        let data
        try {
            data = await ctx.db.query(`SELECT * FROM ${list}`)
        } catch (e) {
            console.log(e)
        }
        if (data && list === 'demo_list') {
            data.forEach(item => {
                item.admin_technology = item.admin_technology.split(',')
            });
        }
        if (list === 'article') {
            // data.forEach(async item => {
            //     let type = await ctx.db.query(`SELECT * FROM catalog WHERE ID=?`, [item.catalog_ID])
            //     item.type = type.title
            // });
            for (let index = 0; index < data.length; index++) {
                let type = await ctx.db.query(`SELECT * FROM catalog WHERE ID=?`, [data[index].catalog_ID])
                console.log(type)
                data[index].type = type[0].title
            }
        }
        // tableConf.forEach(async item => {
        //     console.log(item)
        //     if (item.type === 'select') {
        //         item.vals = await ctx.db.query(item.from);
        //         console.log(item)
        //     }
        // });
        console.log(data)
        await ctx.render('index', {
            data,
            pageConf,
            title,
            page,
            pageTypes,
            explain,
            list
        });
    });
    // router.get('/read', async ctx => {    
 
    // });
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
