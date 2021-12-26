const express = require('express')
const userController = require("../controllers/user")
const refresh = require('./refresh');
const router = express.Router()

/**
 * @swagger
 * components:
 *  schemas:
 *    Users:
 *      type: object
 *      required:
 *        - user_id
 *        - user_datetime_created
 *        - user_nickname
 *        - user_email
 *        - user_password
 *        - user_profile_photo_url
 *        - user_account_isActivated
 *        - user_character_gender
 *        - user_wallet_adress
 *        - user_wallet_public_key
 *      properties:
 *        user_id :
 *          type : integer
 *          description : 유저 식별자(Auto increment)
 *        user_datetime_created :
 *          type: TIMESTAMP 
 *          description : utc TIMESTAMP
 *        user_nickname : 
 *           type : VarChar(100)  
 *           description : 유저 닉네임(unique)
 *        user_email :
 *           type : VarChar(400)   
 *           description : 유저 이메일
 *        user_password :
 *           type : VarChar(100)   
 *           description : 암호화된 비밀번호
 *        user_profile_photo_url : 
 *           type : VarChar(100)   
 *           description : 프로필 사진 주소
 *        user_account_isActivated : 
 *           type : TINYINT  
 *           description : 계정 상태 (TRUE = 계정 활성화 상태, FALSE = 계정 삭제 상태)
 *        user_character_gender : 
 *           type : TINYINT  
 *           description : 캐릭터 성별 (TRUE = 남, FALSE = 여)
 *        user_wallet_adress : 
 *           type : Char(100)  
 *           description : 지갑 주소
 *        user_wallet_public_key : 
 *           type : Char(200)   
 *           description : 지갑 공개키
 *      example:
 *        user_id : 1
 *        user_datetime_created : 2021-12-26 15:26:00
 *        user_nickname : 닉네임123
 *        user_email : 이메일@gmail.com
 *        user_password : $2b$10$MFKYXeTrECpRktLYo8jQLubXSiqHI31g9wS0Aq0woTwXQxjf2GJ6u
 *        user_profile_photo_url : (NULL)
 *        user_account_isActivated : 1 
 *        user_character_gender : 1
 *        user_wallet_adress : "0x1501ce4F58349BbBc16C8E0575749a8C7edB0e77"
 *        user_wallet_public_key : "0x0408da8f6826371d6f5143b5c7cadfa6c3694a3d8546609f75b79d4d47eb83cf811b185b5a6c16981a648c052deedc0fb2c23e208da4adcb9df48541752700ee0d"
 */

 /**
  * @swagger
  * tags:
  *   name: Users
  *   description: 유저 맵핑 API
  */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: 모든 유저 목록 
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: 유저 목록 생성 완료
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Users'
 */
router.get('/', userController.getAllUsers)

/**
 * @swagger
 * /users:
 *   post:
 *     summary: 유저 생성
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             item:
 *             example:
 *               user_nickname : "유저의 닉네임"
 *               user_email : "유저의 이메일"
 *               user_password : "유저의 비밀번호"
 *     responses:
 *       200:
 *         description: 유저 생성 완료
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Users'
 *       500:
 *         description: Some server error 실패
 */
router.post('/', userController.postUser)

router.get('/refresh', refresh);

module.exports = router