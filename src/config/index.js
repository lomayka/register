require('dotenv').config()
const crypto = require('crypto');
function hash(string) {
    console.log("string : ", string);
    let hmac = crypto.createHmac('sha256', process.env.SALT);
    hmac.update(string);
    return hmac.digest('hex');
}
module.exports = {
    PORT: process.env.PORT,
    LIMIT: process.env.LIMIT,
    hash: hash
};