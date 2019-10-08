const Router = require('koa-router');
const path = require('path');
const {HTTP_HOST, HTTP_UPLOAD} = require('../../../config');
const common = require('../../../libs/common');
const fs = require('fs');

function serverRouter () {
    let router = new Router();

    router.get('/getDemo', async ctx => {
        let data = await ctx.db.query(`select * from demo_list`);
        ctx.body = common.resJson(1, data);
    });

    // router.get('/queryArt', async (ctx) => {
    //     let {page, pageSize} = ctx.query;
    //     // ctx.assert( page != undefined || pageSize != undefined, 404, common.resJson(0, '参数错误'));
    //     if (page === 0) {
    //         ctx.throw
    //     }
    //     let arg = pageSize ? [page * pageSize, Number(pageSize)] : [];
    //     let data = pageSize ? await ctx.db.query(`select * from blog_articles order by id desc limit ?, ?;`, arg) : await ctx.db.query(`select * from blog_articles order by id desc;`);
    //     ctx.assert(data.length, 500, common.resJson(0, '数据错误'));
    //     ctx.body = common.resJson(1, data);
    // });
    //
    // router.get('/queryCount', async (ctx) => {
    //     let data = await ctx.db.query(`select count(1) as count from blog_articles;`);
    //     ctx.body = common.resJson(1, data);
    // });
    //
    // router.get('/queryNowHots', async (ctx) => {
    //     let data = await ctx.db.query(`select * from blog_articles order by views desc limit 0, 9;`);
    //     ctx.body = common.resJson(1, data);
    // });

    return router.routes();
}

module.exports = serverRouter();
