const db = require('../util/database') 

// 유저 클래스 생성
module.exports = class User {
    constructor(user_id, user_datetime_created, user_nickname, user_email, user_password, user_profile_photo_url, user_account_isActivated, user_character_gender, user_wallet_adress, user_wallet_public_key) {
        this.user_id = user_id
        this.user_datetime_created = user_datetime_created
        this.user_nickname = user_nickname
        this.user_email = user_email
        this.user_password = user_password
        this.user_profile_photo_url = user_profile_photo_url
        this.user_account_isActivated = user_account_isActivated
        this.user_character_gender = user_character_gender
        this.user_wallet_adress = user_wallet_adress
        this.user_wallet_public_key = user_wallet_public_key
    }

    // 유저 생성
    static post(user_nickname, user_email, user_password, user_wallet_adress, user_wallet_public_key) {
        // return db.execute(`INSERT INTO users(user_nickname, user_email, user_password) VALUES ('${user_nickname}', '${user_email}', '${user_password}')`)
        return db.execute(`INSERT INTO users(user_nickname, user_email, user_password, user_wallet_adress, user_wallet_public_key) VALUES (?, ?, ?, ?, ?)`, [user_nickname, user_email, user_password, user_wallet_adress, user_wallet_public_key] )
    }

    // 유저 모든 정보 fetch
    static fetchAll() {
        // return db.execute('SELECT * FROM spaus_db.users')
        return db.execute('SELECT * FROM users')
    }
}