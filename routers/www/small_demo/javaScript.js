const Router = require('koa-router');
const path = require('path');
const {HTTP_HOST, HTTP_UPLOAD, HTTP_STATIC} = require('../../../config');
const common = require('../../../libs/common');
const fs = require('fs');
// const moment = require('moment');
function serverRouter () {
    let router = new Router();

    router.get('/searchBox', async ctx => {
        // let host = `${HTTP_HOST}/smallDemo/searchBox`
        // ctx.render('www/small_demo/searchBox', {
        //     HTTP_HOST
        // })
        ctx.res.writeHead(200, {'Content-Type': 'text/html' });
        ctx.body = fs.readFileSync(`${HTTP_STATIC}/small_demo/search_box/index.html`);
    });
        router.get('/Observer', async ctx => {
        console.log(666)
        ctx.res.writeHead(200, {'Content-Type': 'text/html' });
        ctx.body = fs.readFileSync(`${HTTP_STATIC}/small_demo/Observer/Observer.html`);
    })

    return router.routes();
}

module.exports = serverRouter();
