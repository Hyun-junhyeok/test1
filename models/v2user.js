const db = require('../util/database') 

// 유저 클래스 생성
module.exports = class User {
    constructor(user_name, user_password, user_address, user_public_key) {
        this.user_name = user_name
        this.user_password = user_password
        this.user_address = user_address
        this.user_public_key = user_public_key
    }

    // 유저 생성
    static post(user_name, user_password, user_address, user_public_key) {
        return db.execute(`INSERT INTO v2users(user_name, user_password, user_address, user_public_key) VALUES (?, ?, ?, ?)`, [user_name, user_password, user_address, user_public_key] )
    }
}