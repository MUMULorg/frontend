import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { postLoginToken } from "../api/postLoginToken";
// import {GoogleLogin} from "@react-oauth/google";
// import {GoogleOAuthProvider} from "@react-oauth/google";
import { useGoogleLogin } from "@react-oauth/google";
import Rabbit from "./../img/Group 12.png";
import { getUserInfo } from "../api/getUserInfo";
import Goggle from "./../img/icon/icGoggle.png";
import Cacao from "./../img/icon/icCacao.png";
import axios from "axios";
import PropTypes from 'prop-types';

const Login = ({ isLogin, setIsLogin, hasRequestedCallback, setHasRequestedCallback }) => {
  const navigate = useNavigate();
  const KAKAO_AUTH_URL = "https://kauth.kakao.com/oauth/authorize?client_id=d2c26f36c69325cd253b8d0b68802286&redirect_uri=https://mumul.site/login/kakao&response_type=code";

  const GoogleSocialLogin = useGoogleLogin({
    scope: "email profile",
    ux_mode: "redirect",
    // redirect_uri: "http://localhost:3000/login",
    flow: "auth-code",
  });

  const kakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  }

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const codeFromURL = queryParams.get("code");


    console.log(" codeFromURL: ", codeFromURL);

    console.log("login.js 로그인여부 1 : " + isLogin);

    if (!isLogin && !hasRequestedCallback && codeFromURL) {
      console.log("Login 로그인 false여서 로그인 실행함 1");
      setHasRequestedCallback(true);
      console.log("Login 로그인 false여서 로그인 실행함 2");


      axios
        .get(`https://api-mumul.site/v1/oauth/login/callback?code=${codeFromURL}`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
           
          },
          withCredentials: true,
          crossDomain: true,
        })

        .then(response => {
          console.log("Login 로그인 false여서 로그인 실행함 3");

          const authToken = response.headers['Authorization'];  // 응답헤더에서 토큰 받기
      
          console.log("Login 의 authToken: ", authToken);

          console.log("Login 로그인 false여서 로그인 실행함 4");

          localStorage.setItem('token', authToken);

          // axios.defaults.headers.common[
          //   'Authorization'
          // ] = `Bearer ${authToken}`;

          console.log("Login 로그인 false여서 로그인 실행함 5");

          setIsLogin(true);

          console.log("Login 로그인 false여서 로그인 실행함 6");
          console.log("Login true됨");
        })
        .catch((error) => {
          console.error("Login.js login err: ", error);
        });
    }

    console.log("login.js 로그인여부 2: " + isLogin);

    if (isLogin) {
      console.log("Login.js 로그인 true임");
      const initLogin = async () => {
        const userInfo = await getUserInfo();
        console.log("userInfo: ", userInfo);
        console.log("userInfo.userId: ", userInfo.userId);
        if (userInfo === false) {
          console.log("Login.js 로그인 true인데 저장된 userInfo는 없음 false");
          setIsLogin(false);
        }

        navigate(`/${userInfo.userId}`);
        console.log("Login.js 로그인 true, 저장된 userInfo있어서 자동 네비게이터");
        setHasRequestedCallback(false);
      };
      initLogin();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin, setHasRequestedCallback, navigate, setIsLogin]);


  return (
    <div className="wrap">
      <div className="content">
        <h1 className="title">MUMUL</h1>
        <div className="loginWrap">
          <div className="img">
            <img src={Rabbit} alt="rabbit" />
          </div>
          <div>
            <div className="text">
              <p className="loginTitle">
                바쁘다 바빠 현대 사회!
                <br />
                반가워 난 토끼야🐰
              </p>
              <p className="loginDecs">MUMUL 스페이스를 만드려면 로그인을 해야 돼</p>
            </div>
            <div className="buttonWrap">
              <button onClick={kakaoLogin}>
                <img src={Cacao} alt="" />
                Kakao 계정으로 계속
              </button>
              <button onClick={GoogleSocialLogin}>
                <img src={Goggle} alt="" />
                Google 계정으로 계속
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  isLogin: PropTypes.any.isRequired,
  setIsLogin: PropTypes.any.isRequired,
  hasRequestedCallback: PropTypes.any.isRequired,
  setHasRequestedCallback: PropTypes.any.isRequired,
}


export default Login;
