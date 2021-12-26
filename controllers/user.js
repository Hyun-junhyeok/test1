const User = require('../models/user')
const wallet = require("../util/kas/wallet")
const bcrypt = require('bcryptjs')

//  POST 유저 생성
exports.postUser = async (req, res, next) => {
    try{
        const account = await wallet.createAccount()
        console.log(account)
            
        const hashed_pwd = await bcrypt.hashSync(req.body.user_password, 10)
        const postResponse = await User.post(req.body.user_nickname, req.body.user_email, hashed_pwd, account.address, account.publicKey)
        res.status(200).json({
            response : postResponse,
            address : account.address
        })
    } catch (err){
        if (!err.statusCode){
            err.statusCode = 500
        }
        next(err)
    }
}

// GET 모든 유저 정보
exports.getAllUsers = async (req, res, next) => {
    try{
        const [allUsers] = await User.fetchAll()
        res.status(200).json(allUsers)
    } catch (err){
        if (!err.statusCode){
            err.statusCode = 500
        }
        next(err)
    }
}



