const Router = require('koa-router');
const path = require('path');
const {HTTP_HOST, HTTP_UPLOAD} = require('../../../config');
const common = require('../../../libs/common');
const fs = require('fs');
// const moment = require('moment');
function serverRouter (tableConf, list, title, page_type) {
    let router = new Router();
    console.log('ok');

    router.get('/aaa', async (ctx) => {
        console.log('/aaa')
        ctx.body = {
            a: 1111
        }
    })
        router.get('/queryArt', async (ctx) => {
            let {page, pageSize} = ctx.query;
            // ctx.assert( page != undefined || pageSize != undefined, 404, common.resJson(0, '参数错误'));
            if (page === 0) {
                ctx.throw
            }
            let arg = pageSize ? [page * pageSize, Number(pageSize)] : [];
            let data = pageSize ? await ctx.db.query(`select * from blog_articles order by id desc limit ?, ?;`, arg) : await ctx.db.query(`select * from blog_articles order by id desc;`);
            ctx.assert(data.length, 500, common.resJson(0, '数据错误'));
            ctx.body = common.resJson(1, data);
        })
    // function queryNowHots (success) {
    //     let querySql = 'select * from blog_articles order by views desc limit 0, 9;'
    //     let connect = dao.createConnection()
    //     let arg = []
    //     connect.connect()
    //     connect.query(querySql, arg, (err, result) => {
    //         if(err) {
    //             throw Error (`数据查询错误: ${err}`)
    //         } else {
    //             success(result)
    //         }
    //     })
    //     connect.end()
    // }
    // function queryCount (success) {
    //     let querySql = 'select count(1) as count from blog_articles;'
    //     let connect = dao.createConnection()
    //     let arg = []
    //     connect.connect()
    //     connect.query(querySql, arg, (err, result) => {
    //         if(err) {
    //             throw Error (`数据查询错误: ${err}`)
    //         } else {
    //             console.log(result)
    //             success(result)
    //         }
    //     })
    //     connect.end()
    // }
    router.get('/queryCount', async (ctx) => {
       let data = await ctx.db.query(`select count(1) as count from blog_articles;`);
       ctx.body = common.resJson(1, data);
    });
    router.get('/queryNowHots', async (ctx) => {
        let data = await ctx.db.query(`select * from blog_articles order by views desc limit 0, 9;`);
        ctx.body = common.resJson(1, data);
    });
        return router.routes();
}

module.exports = serverRouter();
