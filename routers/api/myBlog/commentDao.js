const Router = require('koa-router');
const path = require('path');
// const {HTTP_HOST, HTTP_UPLOAD} = require('../../../config');
const common = require('../../../libs/common');
// const fs = require('fs');
const code = require('svg-captcha');
// const moment = require('moment');
function serverRouter () {
    let router = new Router();

    router.post('/addComment', async ctx => {
        let {bid, use, email, commentContent, parentUse} = ctx.request.fields;
        let arg = [Number(bid), -1, use, email, commentContent, Date.now(), parentUse];
        let data = await ctx.db.query(`insert into comments (blog_id, parent, user_name, email , comments, ctime, parentUse) values (?, ?, ?, ?, ?, ?, ?);`, arg);
        ctx.assert(data, 400, '数据写入错误');
        ctx.body = common.resJson(1, {msg: '提交成功'});
    })

    router.get('/queryNewCom', async (ctx) => {
        let data = await ctx.db.query(`select * from comments order by ctime desc limit 0, 6;`);
        ctx.body = common.resJson(1, data);
    });

    router.get('/queryCode', async ctx => {
        let ico = code.create({
            fontSize: 40,
            width: 100,
            height: 30
        });
        ctx.body = common.resJson(1, ico);
    });

    router.get('/queryComPage', async ctx => {
       let {page, pageSize, bid} = ctx.query;
       let arg = [Number(bid), Number(page) * pageSize, Number(pageSize)];
       let data = await ctx.db.query(`select * from comments where blog_id=? order by id desc limit ?, ?`, arg);
       ctx.body = common.resJson(1, data);
    });

    router.get('/queryComCount', async ctx => {
       let { bid } = ctx.query;
       let data = await ctx.db.query(`select count(1) as count from comments where blog_id=?`, [Number(bid)]);
       ctx.body = common.resJson(1, data);
    });

    return router.routes();
}



module.exports = serverRouter();
