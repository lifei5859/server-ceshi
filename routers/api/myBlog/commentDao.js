const Router = require('koa-router');
const path = require('path');
const {HTTP_HOST, HTTP_UPLOAD} = require('../../../config');
const common = require('../../../libs/common');
const fs = require('fs');
// const moment = require('moment');
function serverRouter () {
    let router = new Router();
    console.log('ok');

    router.get('/queryNewCom', async (ctx) => {
        console.log('666')
        let data = await ctx.db.query(`select * from comments order by ctime desc limit 0, 6;`);
        ctx.body = common.resJson(1, data);
    })

    return router.routes();
}

module.exports = serverRouter();
