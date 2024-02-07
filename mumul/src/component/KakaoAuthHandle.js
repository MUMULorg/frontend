import axios from 'axios';
import React, { useEffect } from 'react';
import { getUserInfo } from '../api/getUserInfo';
import PropTypes from 'prop-types';

const KakaoAuthHandle = (props) => {
  useEffect(() => {
    const kakaoLogin = async () => {
      try {
      let code=new URL(window.location.href).searchParams.get('code');
        const res = await axios.get(`/v1/oauth/login/kakao?code=${code}`,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          crossDomain: true,
        });

        console.log("카카오 로그인 header: ",res.headers);
        console.log("카카오 로그인 auth: ",res.headers.authorization);
        localStorage.setItem('token', res.headers.authorization);
        const userInfo = await getUserInfo();
       // window.location.href = `/${userInfo.userId}`;
      } catch (error) {
        if (error.response) {
          console.error('에러의 응답:', error.response);
          //do something

      } else if (error.request) {
          console.error('에러의 요청:', error.request);
          //do something else

      } else if (error.message) {
          console.error('에러의 메시지:', error.message);
          //do something other than the other two

      }
      }
    };
    kakaoLogin();
  }, [props.history]);

  return (
    <>
    <p>로그인 중입니다...</p>
    </>
  );
};

KakaoAuthHandle.propTypes = {
  history: PropTypes.object.isRequired,
};


export default KakaoAuthHandle;

