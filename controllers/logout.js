// const Login = require('../models/logout')
const bcrypt = require('bcryptjs')
const auth_jwt = require('../util/auth_jwt');
const jwt = require('jsonwebtoken');

//  GET 로그인아웃 생성
exports.getLogout = async (req, res, next) => {
  // access token 또는 refresh token이 헤더에 둘다 가지고 있는지 확인
  if (req.headers.access_token && req.headers.refresh_token) {
    const access_token = req.headers.access_token;
    const refresh_token = req.headers.refresh_token;

    // access token 검증
    const access_token_result = await auth_jwt.verifyAcessToken(access_token);

    // 기존의 access token 디코딩하여 user의 정보를 가져옵니다.
    const decoded_access_token = await jwt.decode(access_token);

    // 디코딩 결과가 없으면 권한이 없음을 응답.
    if (decoded_access_token === null) {
        res.status(401).send({
            ok: false,
            message: '권한이 없습니다. 새로 로그인하세요.1',
        });
        }

    //access token의 decoding 된 값에서 유저의 id를 가져와 refresh token을 검증
    const refresh_token_result = await auth_jwt.verifyRefreshToken(refresh_token, String(decoded_access_token.user_id));

    if (access_token_result.ok === true && refresh_token_result === true) {
        if(auth_jwt.deleteAccessToken(String(decoded_access_token.user_id))){
            auth_jwt.setAccessTokenBlack(access_token)
            res.status(200).send({
              ok: true,
              message: 'refresh token 삭제완료, access token 블랙리스트 등록완료',
          })
        }else{
          res.status(401).send({
            ok: false,
            message: '로그아웃 에러발생',
          });
        }

    }else {
        res.status(401).send({
            ok: false,
            message: '권한이 없습니다. 새로 로그인하세요.2',
          });
    }

  } else {
    // access token 또는 refresh token이 헤더에 없는 경우
    res.status(400).send({
      ok: false,
      message: 'Access token and refresh token are need for refresh!',
    });
  }
}