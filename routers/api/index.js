const Router = require('koa-router');
// const path = require('path');
// const fs = require('await-fs');
const home = require('./home/index');
const article = require('./myBlog/articleDao');
const tag = require('./myBlog/tagDao');
const comment = require('./myBlog/commentDao');
const everyday = require('./myBlog/everyday');
const admin = require('./myBlog/admin');
const javascript = require('./small_demo/javascript')
const uniApp = require('./uniApp/index');
const koaJwt = require('koa-jwt');
let router = new Router();

router.use('/blog', article);
router.use('/blog/tag', tag);
router.use('/blog/comment', comment);
router.use('/blog/everyday', everyday);
router.use('/blog/admin', admin);
router.use('/smallDemo/javascript', javascript)
router.use('/uniApp', uniApp);
router.use('', home);
module.exports = router.routes();
