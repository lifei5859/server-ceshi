const jwt = require('jwt-simple');

module.exports = function jwtDecode (ctx, next, token, secret) {
    let status = jwt.decode(token, secret);
    console.log(status)
}

