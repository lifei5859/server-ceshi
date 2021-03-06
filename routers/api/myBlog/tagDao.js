const Router = require('koa-router');
const common = require('../../../libs/common');
// const path = require('path');
// const {HTTP_HOST, HTTP_UPLOAD} = require('../../../config');
// const fs = require('fs');
// const moment = require('moment');

function serverRouter () {
    let router = new Router();

    // 查找所有tag
    router.get('/getTagPage', async (ctx) => {
        let data = await ctx.db.query(`select * from tags`);
        ctx.assert(data.length, 500, common.resJson(0, '数据错误'));
        ctx.body = common.resJson(1, data);
    });
    //查询tag下文章总数
    router.get('/queryCountByTag', async ctx => {
        let { tid } = ctx.query;
        // console.log(params);
        let data = await ctx.db.query('select count(1) as count from tag_blog_mapping where tag_id=?;', [Number(tid)]);
        console.log(data);
        ctx.body = common.resJson(1, data);
    });

    return router.routes();
}

module.exports = serverRouter();
