const static = require('koa-static');
const {HTTP_STATIC} = require('../config');

module.exports = function (router, options) {
    options = options || {};
    options.image = options.image || 30;
    options.html = options.html || 30;
    options.style = options.style || 30;
    options.script = options.script || 1;
    options.other = options.other || 7; 

    router.all(/((\.jpg)|(\.png)|(\.gif))$/i, static(HTTP_STATIC, {
        maxAge: options.image * 86400 * 1000
    }));
    router.all(/((\.html)|(\.htm))$/i, static(HTTP_STATIC, {
        maxAge: options.html * 86400 * 1000
    }));
    router.all(/(\.css)$/i, static(HTTP_STATIC, {
        maxAge: options.style * 86400 * 1000
    }));
    router.all(/((\.js)|(\.jsx))$/i, static(HTTP_STATIC, {
        maxAge: options.script * 86400 * 1000
    }));
    router.all('*', static(HTTP_STATIC, {
        maxAge: options.other * 86400 * 1000
    }));
}