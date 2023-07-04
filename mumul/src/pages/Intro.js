import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Header from "../component/Header";
import Comment from "../component/Comment";
import { getUserInfo } from "../api/getUserInfo";

const Intro = ({isLogin}) => {
  const [userInfo, setUserInfo] = useState({
    userId: '',
  });
  console.log(userInfo.userId);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserInfo = async () => {
      const data = await getUserInfo();
      setUserInfo(data);
    };
    fetchUserInfo();
  }, []);

  return (
    <div className="wrap intro">
      <Header></Header>
      <div className="contentWrap">
        <p className="introTitle">🐇토끼🐇로 무물에 녹아 들자</p>
        <Comment></Comment>
        {(!token || token === "null") ? (
            <Link to="/login" className="goSpace">
              <button className="space">스페이스 입장</button>
            </Link>
          ) : (
            <Link to={`/space/${userInfo.userId}`} className="goSpace">
              <button className="space">스페이스 입장</button>
            </Link>
        )}
        <Link to="/policy" className="goPolicy">
          <p>PRIVACY POLICY</p>
        </Link>
      </div>
    </div>
  );
};

export default Intro;