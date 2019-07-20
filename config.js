const path=require('path');

module.exports = {
    //database
    DB_HOST: '127.0.0.1',
    DB_PORT: 3306,
    DB_USE: 'root',
    DB_PASS: 'Lifei%*%*528',
    DB_NAME: 'server_demo',
    //http
    HTTP_HOST: 'http://www.fgdemoshow.cn',
    HTTP_PORT: 80,
    HTTP_STATIC: path.resolve(__dirname, './static'),
    HTTP_UPLOAD: path.resolve(__dirname, './static/upload'),
    HTTP_TEMPLATE: path.resolve(__dirname, './template'),
    //keys
    KEY_LEN: 1024,
    KEY_COUNT: 2048,
    // admin
    PASS_SUFFIX: '_wocao%*'
}
