import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { logoutUserToken } from "../api/logoutUserToken";
import PropTypes from 'prop-types';


function Header({ isLogin, setIsLogin, currentUserInfo }) {
  
  const [modal, setModal] = useState(false);
  const profileRef = useRef(null);

  const handleClickOutside = (event) => {
    if (profileRef.current && !profileRef.current.contains(event.target)) {
      setModal(false);
    }
  };

  const handleProfileClick = () => {
    setModal(!modal);
  };

  const handleMumulClick = () => {
    window.location.href = "http://mumul.site";
  };

  useEffect(() => {
    // document 객체에 클릭 이벤트 리스너 등록
    document.addEventListener("click", handleClickOutside);
    return () => {
      // 컴포넌트가 언마운트 될 때 이벤트 리스너 제거
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
       <h1 className="title" onClick={handleMumulClick}>MUMUL</h1>
      <div className="profile" ref={profileRef}>
        {isLogin === true ? (
          <img
            src={ currentUserInfo.picture}
            alt="profile"
            onClick={handleProfileClick}
          />
        ):(
          <Link to="/login" className="loginBtn">
            로그인
          </Link>
        )}
      </div>
      {modal && (
        <HeaderPopup
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          currentUserInfo={currentUserInfo}
        />
      )}
    </header>
  );
  
}


function HeaderPopup({ isLogin, setIsLogin, currentUserInfo }) {

  const handleLogout = async () => {
    try {
      const result = await logoutUserToken();
      if (result) {
        // 로그아웃 성공
        setIsLogin(false);
        window.location.href = '/login';
      } 
    } catch (error) {
      console.error("로그아웃 오류: ", error.message);
    }
  };

  const handleClickMySpace = () => {
    if (currentUserInfo.userId === '') {
      alert("로그인 하세요.");
      return;
    }
  };

  return (
    <ul className="headerPopup">
      <li className="list" onClick={handleClickMySpace}>
      <Link to={isLogin !== false ? '/' + currentUserInfo.userId : '#'} onClick={(e) => {
        if (isLogin !== false && window.location.pathname === '/' + currentUserInfo.userId) {
          e.preventDefault(); // Prevent the default link behavior
          window.location.reload(); // Force a page reload
        }
      }}>
        <p>내 스페이스</p>
      </Link>
  </li>

      <li className="list" onClick={() => { if(isLogin !== false) handleLogout(); }}>
        <Link to="/login">
          <p>{isLogin ? "로그아웃" : "로그인"}</p>
        </Link>
      </li>
      <li className="list" onClick={handleClickMySpace}>
        <Link to={currentUserInfo.userId !== '' ? '/setting' : '#'}>
          <p>설정</p>
        </Link>
      </li>
    </ul>
  );
}


Header.propTypes = {
  isLogin: PropTypes.any.isRequired,
  setIsLogin: PropTypes.any.isRequired,
  currentUserInfo: PropTypes.any.isRequired,
};

HeaderPopup.propTypes = {
  isLogin: PropTypes.any.isRequired,
  setIsLogin: PropTypes.any.isRequired,
  currentUserInfo: PropTypes.any.isRequired,
};


export default Header;