const path=require('path');

module.exports = {
    //database
    DB_HOST: '127.0.0.1',
    DB_PORT: 3306,
    DB_USE: 'root',
    DB_PASS: 'Lifei%*%*528',
    DB_NAME: 'server_demo',
    //http
    HTTP_HOST: '49.234.184.195',
    HTTP_PORT: 80,
    HTTP_STATIC: path.resolve(__dirname, './static'),
    HTTP_UPLOAD: path.resolve(__dirname, './static/upload'),
    HTTP_TEMPLATE: path.resolve(__dirname, './template'),
    //keys
    KEY_LEN: 1024,
    KEY_COUNT: 2048,
    // admin
    PASS_SUFFIX: '_wocao%*',
    //weixin
    WX_ID: 'wx6be487b76f811240',
    WX_SECRET: '700f4d00d5a0c2846617a75f6686f990',
    //token
    tokenExpiresTime: 10
}
