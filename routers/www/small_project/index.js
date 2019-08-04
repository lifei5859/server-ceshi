const Router = require('koa-router');
const path = require('path');
const {HTTP_HOST, HTTP_UPLOAD, HTTP_STATIC} = require('../../../config');
const common = require('../../../libs/common');
const fs = require('fs');
// const moment = require('moment');
function serverRouter () {
    let router = new Router();

    router.get('/GluttonousSnake', async ctx => {
        ctx.res.writeHead(200, {'Content-Type': 'text/html' });
        ctx.body = fs.readFileSync(`${HTTP_STATIC}/small_project/GluttonousSnake/index.html`);
    });

    return router.routes();
}

module.exports = serverRouter();
