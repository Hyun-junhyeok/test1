const auth_jwt = require('../util/auth_jwt');
const jwt = require('jsonwebtoken');

const refresh = async (req, res) => {
  // access token 또는 refresh token이 헤더에 둘다 가지고 있는지 확인
  if (req.headers.access_token && req.headers.refresh_token) {
    const access_token = req.headers.access_token;
    const refresh_token = req.headers.refresh_token;

    // access token 검증
    const access_token_result = auth_jwt.verifyAcessToken(access_token);

    // 기존의 access token 디코딩하여 user의 정보를 가져옵니다.
    const decoded_access_token = jwt.decode(access_token);

    console.log(decoded_access_token)

    // 디코딩 결과가 없으면 권한이 없음을 응답.
    if (decoded_access_token === null) {
      res.status(401).send({
        ok: false,
        message: '권한이 없습니다. 새로 로그인하세요.',
      });
    }

    //access token의 decoding 된 값에서 유저의 id를 가져와 refresh token을 검증
    const refresh_token_result = await auth_jwt.verifyRefreshToken(refresh_token, String(decoded_access_token.user_id));

    //  재발급을 위해서는 access token이 만료되어 있어야합니다.
    if (access_token_result.ok === false && access_token_result.message === 'jwt expired') {
      // 1. access token이 만료되고, refresh token도 만료 된 경우 => 새로 로그인해야합니다.
      if (refresh_token_result === false) {
        res.status(401).send({
          ok: false,
          message: '권한이 없습니다. 새로 로그인하세요.',
        });
      } else {
        // 2. access token이 만료되고, refresh token은 만료되지 않은 경우 => 새로운 access token을 발급
        const new_access_token = auth_jwt.getAccesToken(decoded_access_token.user_id, decoded_access_token.user_nickname);
        res.status(200).send({
          ok: true,
          data : {access_token : new_access_token, fresh_token : refresh_token}
        });
      }
    } else {
      // 3. access token이 만료되지 않은경우 => refresh 할 필요가 없습니다.
      res.status(400).send({
        ok: false,
        message: '기존의 access 토큰을 사용하세요.',
      });
    }
  } else {
    // access token 또는 refresh token이 헤더에 없는 경우
    res.status(400).send({
      ok: false,
      message: 'Access token and refresh token are need for refresh!',
    });
  }
};

module.exports = refresh;