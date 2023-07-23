import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { postLoginToken } from "../api/postLoginToken";
import {GoogleLogin} from "@react-oauth/google";
import {GoogleOAuthProvider} from "@react-oauth/google";
import Rabbit from "./../img/Group 12.png";
import { getUserInfo } from "../api/getUserInfo";

const Login = ({ isLogin, setIsLogin }) => {
  const navigate = useNavigate();

  const onGoogleSignIn = async (res) => {
    const { credential } = res;
    const result = await postLoginToken(credential);
    if (result) {
      setIsLogin(true); // 로그인 성공 시에만 isLogin을 true로 설정
    }
  };

  useEffect(() => {
    const initLogin = async () => {
      if (!isLogin) {
        return;
      }
      const userInfo = await getUserInfo();
      if(userInfo === false) {
        setIsLogin(false);
      }
      navigate(`/${userInfo.userId}`);
    };
    if (isLogin) {
      initLogin();
    }
  }, [isLogin, navigate, setIsLogin]);

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
            <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
                <GoogleLogin
                    onSuccess={(res) => {
                        onGoogleSignIn(res);
                    }}
                    onFailure={(err) => {
                        console.log(err);
                    }}
                    // ux_mode= "redirect"
                    width='300px'
                />
            </GoogleOAuthProvider>
              {/* <GoogleLogin onGoogleSignIn={onGoogleSignIn} text="로그인" /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
