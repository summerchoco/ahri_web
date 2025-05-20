require('dotenv').config({ path: __dirname + '/.env' });
//dotenv는 Node.js에서 환경 변수(.env 파일)를 로드하는 라이브러리

module.exports = {
    db: {
        client: process.env.DB_CLIENT || 'mysql2',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        charset : 'utf8mb4'
    },
    server: {
        port: process.env.SERVER_PORT || 4000,
    },
};