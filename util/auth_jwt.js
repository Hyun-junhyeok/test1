const redis = require('redis') // 레디스 객체 생성
const jwt = require('jsonwebtoken');
const redisClient = redis.createClient(6379, '127.0.0.1')
const auth_jwt = require('../util/auth_jwt');
const secret = "spaus";

redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.connect();

// access token 발급
exports.getAccesToken = (user_id, user_nickname) => { 
    const payload = { // access token에 들어갈 payload
        user_id: user_id,
        user_nickname: user_nickname
    };
    return jwt.sign(payload, secret, { // secret으로 sign하여 발급하고 return
        algorithm: 'HS256', // 암호화 알고리즘
        expiresIn: '1h', // 유효기간
    });
}

// access token 검증
exports.verifyAcessToken = async (access_token) => { 

    const a = await auth_jwt.verifyAccessTokenBlack(access_token)

    if(a){
        return {ok: false};
    }else{
        let decoded = null;
        try {
            decoded = jwt.verify(access_token, secret);
            return {ok: true, user_id: decoded.user_id, user_nickname: decoded.user_nickname};
        } catch (err) {
            return {ok: false, message: err.message};
        }
    }
}

// refresh token 발급
exports.getRefreshToken =  () => { 
    return jwt.sign({}, secret, { // refresh token은 payload 없이 발급
      algorithm: 'HS256',
      expiresIn: '14d',
    });
  }

  // refresh token 저장
exports.storeRefreshToken = async (user_id, refresh_token) => {
    await redisClient.set(user_id, refresh_token);
}

// refresh token 검증  
exports.verifyRefreshToken = async (refresh_token, user_id) => {
    const get_refresh_token = await redisClient.get(user_id);
    
    if (refresh_token === get_refresh_token) {
        try {
            jwt.verify(refresh_token, secret);
            return true;
        } catch (err) {
            return false;
        }
    } else {
        return false;
    }
}

exports.deleteAccessToken = async (user_id) => {
    try {
        await redisClient.del(user_id);
        return true
    } catch (err) {
        return false
    }
}

exports.setAccessTokenBlack = async (access_token) => {
    const decoded = jwt.decode(access_token);

    const exp_date = new Date(0)
    exp_date.setUTCSeconds(decoded.exp);
    const current_date = new Date();

    let expired_duration_msec = exp_date.getTime() - current_date.getTime();
    expired_duration_msec = expired_duration_msec/1000

    await redisClient.setEx(access_token, parseInt(expired_duration_msec), "logout")
}

exports.verifyAccessTokenBlack = async (access_token) => {
    const black = await redisClient.get(access_token)

    if (black === "logout"){
        return true
    } else {
        return false
    }

}

