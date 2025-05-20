require('dotenv').config({ path: __dirname + '/.env' });

module.exports.ahriConfig = {
    apiUrl: process.env.AHRI_URL
};