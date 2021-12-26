const Login = require('../models/login')
const bcrypt = require('bcrypt')
const auth_jwt = require('../util/auth_jwt');

//  POST 로그인 생성
exports.postLogin = async (req, res, next) => {
    try{
        const postResponse = await Login.post(req.body.user_email)
        const json_user = postResponse[0][0]

        if(!json_user){
            res.status(200).send("없는 아이디입니다.")
        } else {
            if(bcrypt.compareSync(req.body.user_password, json_user.user_password)){
                // 아이디 비밀번호가 일치할 때
                const access_token = await auth_jwt.getAccesToken(json_user.user_id, json_user.user_nickname);
                const fresh_token = await auth_jwt.getRefreshToken()
                await auth_jwt.storeRefreshToken(String(json_user.user_id), fresh_token)
                res.status(200).send({ ok: true, data : {access_token : access_token, fresh_token : fresh_token}})
            }else{
                // 비밀번호가 다를 때
                res.status(401).send("비밀번호가 다릅니다.")
            }
        }

    } catch (err){
        if (!err.statusCode){
            err.statusCode = 500
        }
        next(err)
    }
}