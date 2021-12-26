const db = require('../util/database') 

// 로그인 클래스 생성
module.exports = class Login{
    // 로그인 생성
    static post(user_email) {
        return db.execute(`SELECT * FROM users WHERE user_email = (?)`, [user_email])
    }
}