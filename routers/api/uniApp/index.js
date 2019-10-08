const Router = require('koa-router');
const path = require('path');
const { WX_ID, WX_SECRET, tokenExpiresTime } = require('../../../config');
const common = require('../../../libs/common');
const fs = require('await-fs');
const request = require('request');
const jwt = require('jwt-simple');
const decode = require('../../../libs/jwtDecode')
// const moment = require('moment');
function serverRouter () {
    let router = new Router();
    router.post('/login', async ctx => {
        console.log(ctx.request.fields);
        let {openid, name, face, sign } = ctx.request.fields;
        let userRes = await ctx.db.query(`select * from nui_user where u_id=?;`, [openid]);
        let userInfo = {};
        if (!userRes.length) {
            let random = common.md5(openid);
            let time = Date.now();
            let arg = [openid, name, face, random, time];
            console.log(arg);
            let res = await ctx.db.query(`insert into nui_user (u_id, u_name, u_face, u_random, ctime) values (?,?,?,?,?);`, arg)
            userInfo.u_id = openid;
            userInfo.u_name = name;
            userInfo.u_random = random;
            userInfo.u_face = face;
            ctx.body = common.resJson(1, {
                msg: '注册且登陆成功',
                userInfo
            });
            return;
        }
        userInfo = userRes[0];
        const payload = {
            user: userInfo.u_id,
            environment: userInfo.u_random,
            expires: Date.now() + tokenExpiresTime
        };
        let token = jwt.encode(payload, WX_SECRET)
        ctx.body = common.resJson(1, {
            userInfo,
            token,
            msg: '登陆成功'
        });
    });
    router.get('/getOpen', async ctx => {
        let {code} = ctx.query;
        let res = request({url: `https://api.weixin.qq.com/sns/jscode2session?appid=${WX_ID}&secret=${WX_SECRET}&js_code=${code}&grant_type=authorization_code`});
        console.log(res);
        ctx.body = res
    });
    // "https://api.weixin.qq.com/sns/jscode2session?appid=".HS_APPID."&secret="."&js_code=".$_GET['code']."&grant_type=authorization_code";
    router.get('/*', async ctx => {
        let {token} = ctx.query;
        decode(null, null, token, WX_SECRET);
    });
    return router.routes();
}

module.exports = serverRouter();
