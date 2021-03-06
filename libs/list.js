const Router = require('koa-router');
const path = require('path');
const {HTTP_HOST, HTTP_UPLOAD} = require('../config');
const common = require('./common');
const fs = require('fs');
const moment = require('moment');

module.exports = function (tableConf, list, title, page_type) {
    let router = new Router();

    const page_types = {
        'banner': 'banner管理',
        'catalog': '类目管理',
        'article': '文章管理',
        'demoList': 'demo管理',
    };
    router.get('/', async ctx => {
        let data = await ctx.db.query(`SELECT * FROM ${list}`);
        tableConf.forEach(async item => {
            console.log(item)
            if (item.type === 'select') {
                if (item.list) {
                    item.vals = item.list;
                }else {
                    item.vals = await ctx.db.query(item.from);
                }
            }
        });
        await ctx.render('admin/index', {
            data,
            tableConf,
            title,
            page_type,
            page_types
        });
    });

    router.post('/list', async ctx => {
        let req = ctx.request.fields;
        console.log(req)
        let keys = [];
        let values =[];
        tableConf.forEach(({name, type}) => {
            keys.push(name);
            if (type === 'file') {
                values.push(path.basename(req[name][0].path));
            } else if (type === 'date') {
                values.push(moment().valueOf(req[name]));
            } else {
                values.push(req[name]);
            }
        });
        await ctx.db.query(`INSERT INTO ${list} (${keys.join(',')}) VALUES(${keys.map(key => '?').join(',')})`,  values);
        ctx.body = common.resJson(1, '添加成功');
    });

    router.get('/delete/:id', async ctx => {
        let {id} = ctx.params;
        let data = await ctx.db.query(`SELECT * FROM ${list} WHERE ID=?`, [id]);
        ctx.assert(data.length, 500, common.resJson(0, '数据错误'));
        let temp = data[0];
        tableConf.forEach(({name, type}) => {
            if (type === 'file') {
                let src = path.resolve(HTTP_UPLOAD, temp[name]);
                fs.stat(src, async (err) => {
                    if (!err) {
                        await common.remove(src);
                    }
                });
            }
        });
        await ctx.db.query(`DELETE FROM ${list} WHERE ID=?`, [id]);
        ctx.body = common.resJson(1, '删除成功');
    });

    router.get('/getList/:id', async ctx => {
        let {id} = ctx.params;
        let data = await ctx.db.query(`SELECT * FROM ${list} WHERE ID=?`, [Number(id)]);
        ctx.assert(data.length, 500, common.resJson(0, '数据错误'));
        console.log(data);
        ctx.body = common.resJson(1, data[0]);
    });

    router.post('/update/:id', async ctx => {
        let {id} = ctx.params;
        let req = ctx.request.fields;
        let data = await ctx.db.query(`SELECT * FROM ${list} WHERE ID=?`, [id]);
        ctx.assert(data.length, 500, common.resJson(0, '数据错误'));
        let oldImg = {};
        let keys = [];
        let values = [];
        let imgChange = {};
        // tableConf.forEach(async ({name, type}) => {
        //     if (type === 'file') {
        //         oldImg[name] = data[0][name];
        //         if (req[name].length && req[name] && req[name][0].size) {
        //             imgChange[name] = true;
        //             keys.push(name);
        //             values.push(path.basename(req[name][0].path));
        //         };
        //     } else {
        //         keys.push(name);
        //         if (req[name] === undefined) {
        //             let data = await ctx.db.query(`SELECT ${name} FROM ${list} WHERE ID=?`, [id]);
        //             values.push(data[0][name])
        //             console.log(data[0][name])
        //         } else {
        //             values.push(req[name]);
        //         }
        //     }
        // });
        for (let i = 0; i < tableConf.length; i++) {
            if (tableConf[i].type === 'file') {
                oldImg[tableConf[i].name] = data[0][tableConf[i].name];
                if (req[tableConf[i].name].length && req[tableConf[i].name] && req[tableConf[i].name][0].size) {
                    imgChange[tableConf[i].name] = true;
                    keys.push(tableConf[i].name);
                    values.push(path.basename(req[tableConf[i].name][0].path));
                };
            } else {
                keys.push(tableConf[i].name);
                if (req[tableConf[i].name] === undefined) {
                    let data = await ctx.db.query(`SELECT ${tableConf[i].name} FROM ${list} WHERE ID=?`, [id]);
                    values.push(data[0][tableConf[i].name])
                    console.log(data[0][tableConf[i].name])
                } else {
                    values.push(req[tableConf[i].name]);
                }
            }
        }
        console.log(keys)
        console.log(values)
        await ctx.db.query(`UPDATE ${list} SET ${keys.map(key=>(`${key}=?`)).join(',')} WHERE ID=?`, [...values, id]);
        tableConf.forEach(async ({name, type}) => {
            if (type === 'file' && imgChange[name]) {
                await common.remove(path.resolve(HTTP_UPLOAD, oldImg[name]));
            }
        });
        ctx.body = common.resJson(1, '修改成功');
    });

    return router.routes();
}
