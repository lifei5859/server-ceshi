const Router = require('koa-router');
const path = require('path');
const {HTTP_HOST, HTTP_UPLOAD} = require('../../../config');
const common = require('../../../libs/common');
const fs = require('fs');
// const moment = require('moment');
function serverRouter (tableConf, list, title, page_type) {
    let router = new Router();


    return router.routes();
}

module.exports = serverRouter();
