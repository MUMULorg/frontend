import { Link } from "react-router-dom";
import Comment from "../pages/Comment";
import React, { useState, useEffect } from "react";
import { getUserInfo } from "../api/getUserInfo";
import MobileBrowser from "../component/popup/MobileBrowser"; // 팝업창 컴포넌트 임포트
import PropTypes from 'prop-types';

const Intro = ({ isLogin, setIsLogin }) => {
  console.log("인트로 로그인여부: "+ isLogin);
  const [currentUserInfo, setCurrentUserInfo] = useState({
    userId: "",
    picture: "",
    name: "",
  });



  const [showPopup, setShowPopup] = useState(false); // 팝업창 표시 여부 상태

  useEffect(() => {
    const initUserInfo = async () => {
      const response = await getUserInfo();
      if (response === false) {
        setIsLogin(false);
        return;
      } else {
        setCurrentUserInfo(response);
        setIsLogin(true);
      }
    };
    initUserInfo();

  }, [setIsLogin]);




  const handleConfirmPopup = () => {
    setShowPopup(false); // "네, 이동합니다." 버튼을 누르면 팝업창을 닫습니다.
  };

  return (
    <div className="wrap intro">
      <div className="contentWrap">
        <p className="introTitle">
        <span role="img" aria-label="link">
          🐇토끼🐇로 무물에 녹아 들자
          </span></p>
        <Comment></Comment>
      
        {isLogin ? (
          <Link to={`/${currentUserInfo.userId}`} className="goSpace">
            <button className="space">스페이스 입장</button>
          </Link>
        ) : (
          <Link to="/login" className="goSpace">
            <button className="space">스페이스 입장</button>
          </Link>
        )}

          <div>
           <p className="inApp" onClick={() => setShowPopup(true)}>다른 앱을 통해서 접속했다면</p>
            {showPopup && <MobileBrowser onClose={handleConfirmPopup} />}
          </div>

        <Link to="/policy" className="goPolicy">
          <p>PRIVACY POLICY</p>
        </Link>
      </div>
    </div>
  );
};

Intro.propTypes={
  isLogin: PropTypes.any.isRequired,
  setIsLogin: PropTypes.any.isRequired,  
}


export default Intro;