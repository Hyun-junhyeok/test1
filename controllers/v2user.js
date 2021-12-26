const V2user = require('../models/v2user')
const wallet = require("../util/kas/wallet")

//  POST 유저 생성
exports.postUser = async (req, res, next) => {
    try{
        const account = await wallet.createAccount()
        console.log(account)

        const postResponse = await V2user.post(req.body.user_name, req.body.user_password, account.address, account.publicKey)

        res.status(200).json({
            address : account.address
        }
        )
    } catch (err){
        if (!err.statusCode){
            err.statusCode = 500
        }
        next(err)
    }
}



