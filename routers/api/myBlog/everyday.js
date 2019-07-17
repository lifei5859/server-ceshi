const Router = require('koa-router');
const path = require('path');
const {HTTP_HOST, HTTP_UPLOAD} = require('../../../config');
const common = require('../../../libs/common');
const fs = require('fs');
// const moment = require('moment');
function serverRouter (tableConf, list, title, page_type) {
    let router = new Router();

    router.get('/queryEveryday', async (ctx) => {
        let data = await ctx.db.query(`select * from every_day order by id desc limit 1;`);
        ctx.assert(data.length, 500, common.resJson(0, '数据错误'));
        ctx.body = common.resJson(1, data);
    });

    return router.routes();
}

module.exports = serverRouter();
