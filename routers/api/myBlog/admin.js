const Router = require('koa-router');
const path = require('path');
const { PASS_SUFFIX } = require('../../../config');
const common = require('../../../libs/common');
const fs = require('await-fs');
// const moment = require('moment');
function serverRouter () {
    let router = new Router();
    router.get('/isLogin', async ctx => {
        if (ctx.session['admin']) {
            ctx.body = 'login'
        } else {
            ctx.body = 'notLogin'
        }
    });
    router.post('/login', async ctx => {
        let {user, password} = ctx.request.fields;
        let data = await fs.readFile(path.resolve(__dirname, '../../../static/admin.json'));
        let adminArr = JSON.parse(data);
        ctx.assert(user, 400, 'user is required');
        ctx.assert(password, 400, 'password is required');
        let tempAdmin = adminArr.filter(item => {
            return (item.name === user);
        });
        if (tempAdmin.length === 0) {
            ctx.body = common.resJson(0, '用户不存在');
            return;
        }
        if (tempAdmin[0].pass !== common.md5(password + PASS_SUFFIX)) {
            ctx.body = common.resJson(0, '密码错误');
            return;
        }
        ctx.session['admin'] = user;
        ctx.body = common.resJson(1, '登录成功');
    });


    return router.routes();
}

module.exports = serverRouter();
