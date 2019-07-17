const Router = require('koa-router');
const path = require('path');
const fs = require('await-fs');
const aricle = require('./myBlog/articleDao');
const tag = require('./myBlog/tagDao');
const comment = require('./myBlog/commentDao');
const everyday = require('./myBlog/everyday');
let router = new Router();

router.use('/blog', aricle);
router.use('/blog/tag', tag);
router.use('/blog/comment', comment);
router.use('/blog/everyday', everyday);
module.exports = router.routes()
