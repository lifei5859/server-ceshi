const Router = require('koa-router');
const path = require('path');
const {HTTP_HOST, HTTP_UPLOAD} = require('../../../config');
const common = require('../../../libs/common');
const fs = require('fs');

function serverRouter () {
    let router = new Router();
    router.post('/upload', async ctx => {
        let req = ctx.request.fields;
        let data = [];
        console.log(req);
        let imgPathArr = req['file'];
        console.log(imgPathArr);
        for (let i = 0; i < imgPathArr.length; i++) {
            var temp = {path: path.basename(imgPathArr[i].path), type: imgPathArr[i].type, name: imgPathArr[i].name}
            data.push(temp);
        }
        
        ctx.body = common.resJson(1, data);
    });

    return router.routes();
}

module.exports = serverRouter();
