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
    try{
      const queryParams = new URLSearchParams(window.location.search);
      const codeFromURL = queryParams.get("code");
  
      console.log(" codeFromURL: ", codeFromURL);
  
      if (!isLogin && !hasRequestedCallback && codeFromURL) {
        setHasRequestedCallback(true);
  
        axios
          .get(`https://api-mumul.site/v1/oauth/login/callback?code=${codeFromURL}`, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
           // withCredentials: true, //-> cors 문제 해결 위해 일단 주석처리
            cache: 'no-cache', // 캐시를 비우는 옵션 추가
            crossDomain: true,
          })
  
          .then(response => {
            if(response.status===200){
              console.log("Login 전체 응답: ", response.data);
  
              console.log("Authorization 헤더 출력: ",response.headers.get('Authorization'));
    
              console.log("Authorization 헤더값 존재여부: ",response.headers.has('Authorization'));
    
  
              const authToken = response.headers['authorization'];
              const authToken_=response.headers.get('Authorization');
          
              console.log("Login 의 authToken: ", authToken);
              console.log("Login 의 authToken_: ", authToken_);
              console.log("res.headers['authorization']: ", response.headers['authorization']);
              console.log("response.headers.get('authorization'): ", response.headers.get('authorization'));
              console.log("response.headers.Authorization: ", response.headers.Authorization);
              console.log("response.headers.authorization: ", response.headers.authorization);
  
              console.log("headers 전체 출력: ", response.headers);
    
    
              window.localStorage.setItem('token', authToken);
    
              // axios.defaults.headers.common[
              //   'Authorization'
              // ] = `Bearer ${authToken}`;
    
    
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
