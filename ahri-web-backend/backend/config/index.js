// const db = require('./db');  // Knex.js 설정
require('dotenv').config({ path: __dirname + '/.env' });
const server = require('./env').server;  // 서버 설정 (포트 등)
const ahriConfig = require('./ahriApi').ahriConfig;

module.exports = {server, ahriConfig };