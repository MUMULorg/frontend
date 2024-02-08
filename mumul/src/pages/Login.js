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
  window.location.reload();
  const navigate = useNavigate();
  const KAKAO_AUTH_URL = "https://kauth.kakao.com/oauth/authorize?client_id=d2c26f36c69325cd253b8d0b68802286&redirect_uri=https://mumul.site/login/kakao&response_type=code";

  const GoogleSocialLogin = useGoogleLogin({
    scope: "email profile",
    ux_mode: "redirect",
    flow: "auth-code",
  });

  const kakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  }

  useEffect(() => {
    try{
      const queryParams = new URLSearchParams(window.location.search);
      const codeFromURL = queryParams.get("code");
  
      if (!isLogin && !hasRequestedCallback && codeFromURL) {
        setHasRequestedCallback(true);
  
        axios
          .get(`https://api-mumul.site/v1/oauth/login/callback?code=${codeFromURL}`, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            crossDomain: true,
          })
  
          .then(response => {
            if(response.status===200){
              const authToken = response.headers['authorization'];
              window.localStorage.setItem('token', authToken);
              setIsLogin(true);
            }
            
          })
          .catch((error) => {
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
      
          return false;
          });
      }

  
      if (isLogin) {

        const initLogin = async () => {
          const userInfo = await getUserInfo();
          if (userInfo === false) {
            setIsLogin(false);
          }
  
          navigate(`/${userInfo.userId}`);
          setHasRequestedCallback(false);
        };
        initLogin();
      }

    }catch(error){
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

    return false;
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
              {/* <button onClick={kakaoLogin}>
                <img src={Cacao} alt="" />
                Kakao 계정으로 계속
              </button> */}
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
