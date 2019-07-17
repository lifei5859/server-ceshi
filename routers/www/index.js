const Router = require('koa-router');
const path = require('path');
const fs = require('fs');
const { HTTP_STATIC } = require('../../config')
let router = new Router();

router.get('/', async ctx => {
    await ctx.render('index', {
        title: '主页'
    });
});
router.get('/about', async ctx => {
    await ctx.render('index', {
        title: '关于'
    });
})
router.get('/reat', async ctx => {
    await ctx.render('index', {
        title: '读书会，敬请期待'
    });
})
router.get('/blog', async ctx => {
    ctx.res.writeHead(200, {"Content-Type":"text/html;charset=UTF-8"});
    ctx.body = fs.readFileSync(`${HTTP_STATIC}/index.html`);
});

module.exports = router.routes();
