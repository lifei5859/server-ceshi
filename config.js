const path=require('path');

module.exports = {
    //database
    DB_HOST: '127.0.0.1',
    DB_PORT: 3306,
    DB_USE: 'root',
    DB_PASS: 'lifei5858',
    DB_NAME: 'server_demo',
    //http
    HTTP_HOST: 'http://49.234.184.195',
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
