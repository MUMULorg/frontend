import React, { useState, useEffect } from "react";

import Heart from "./../img/icHeaderBlack.png";
import LineHeart from "./../img/icHeartWhite.png";
import More from "./../img/icon/icMore.png";
import Share from "./../img/icon/icShare.png";
import Good from "./../img/icon/icGood.png";
import GoodRed from "./../img/icon/icGoodRed.png";
import InstaLogo from "./../img/icon/instaLogo.jpeg";
import CopyLink from "./../img/icon/CopyLink.png";
import Bin from "./../img/icon/icBin.png";
import { getSpaceInfo } from "../api/getSpaceInfo";
import Delete from "./popup/Delete";
import { getSentComment } from "../api/getSentComment"; 
import UntilAnswering from "./UntilAnswering";
import AnonymousAnswer from "./AnonymousAnswer";

function SendComment({ spaceId, info }) {
  const [sentComments, setSentComments] = useState([]);

  const [spaceOwner, setSpaceOwner] = useState({
    userId: "",
    picture: "",
    name: "",
  });

  useEffect(() => {
    const fetchSentComments = async () => {
      try {
        const spaInfo = await getSpaceInfo(spaceId);
        const sent = await getSentComment(spaceId);

        console.log("sent:", sent);

        const sentArray = Object.values(sent.data).map((item) => item || {});
        console.log("sentArray:", sentArray);
        setSentComments(sentArray);
        setSpaceOwner(spaInfo);
      } catch (error) {
        console.error("Error fetching sent comments:", error);
      }
    };

    fetchSentComments();
  }, [spaceId]);

  //하트 상태값
  const [heartState, setHeartState] = useState(false);
  //좋아요 상태값
  const [goodState, setGoodState] = useState(false);
  // 빈 하트
  const [heart, setHeart] = useState(LineHeart);
  //빈 좋아요
  const [good, setGood] = useState(Good);
  //삭제 상태값
  const [del, setDelete] = useState(false);
  const [del_1, setDelete_1] = useState(false);
  //공유하기 상태값
  const [share, setShare] = useState(false);
  const [share_1, setShare_1] = useState(false);
  //공유하기 모달 오픈 상태값
  const [shareModal, setShareModal] = useState(false);
  //삭제 모달 오픈 상태값
  const [delModal, setDelModal] = useState(false);
  //하트 상태값에 따른 이미지 변경 함수
  const clickHeart = () => {
    if (heartState) {
      setHeartState(false);
      setHeart(LineHeart);
    } else {
      setHeartState(true);
      setHeart(Heart);
    }
  };

  //좋아요 상태값에 따른 이미지 변경 함수
  const clickGood = () => {
    if (goodState) {
      setGoodState(false);
      setGood(Good);
    } else {
      setGoodState(true);
      setGood(GoodRed);
    }
  };

  //삭제 상태값에 따른 더보기 버튼
  const clickMore = () => {
    if (del) {
      setDelete(false);
    } else {
      setDelete(true);
    }
  };

  const clickMore_1 = () => {
    if (del_1) {
      setDelete_1(false);
    } else {
      setDelete_1(true);
    }
  };
  //삭제하기 클릭 시 모달 오픈
  const showDelModal = () => {
    setDelModal(true);
    setDelete(false);
    setDelete_1(false);
  };

  // 삭제 팝업  닫기
  const onClose = () => {
    setDelModal(false);
    setDelete(false);
  };

  //공유하기  오픈
  const showShareModal = () => {
    if (share) {
      setShareModal(false);
      setShare(false);
    } else {
      setShareModal(true);
      setShare(true);
    }
  };

  //공유하기  오픈
  const showShareModal_1 = () => {
    if (share_1) {
      setShareModal(false);
      setShare_1(false);
    } else {
      setShareModal(true);
      setShare_1(true);
    }
  };
  const onClickcopy = () => {
    setShare(false);
    alert("링크가 복사 되었습니다");
  };
  return (
    <>
      {sentComments.length === 0 && <p>첫 질문을 보내 보세요👻</p>}
      {sentComments.slice().reverse().map((sent, index) => (
        <>
          <div key={index} className="commentWrap questionWrap">
            <div className="profileArea">
              <img src={sent.sentUserPic} alt="profile1" className="questioner" />
            </div>
            <div className="cnt">
              <p className="Nicname">{sent.userId}</p>
              <p className="min">{sent.createdTime}</p>
              <p className="commentCnt"> {sent.questionText} </p>
              <div className="heart">
                <img src={heart} alt="하트" onClick={clickHeart} />
              </div>
              <div className="more">
                <img src={More} alt="more" onClick={clickMore} />
                {del && (
                  <div className="del" onClick={showDelModal}>
                    <p>
                      <img src={Bin} alt="btin" />
                      삭제하기
                    </p>
                  </div>
                )}
              </div>
              <div className="share">
                <img src={Share} alt="share" onClick={showShareModal} />
                {share && (
                  <div className="sharePopup">
                    <p>
                      <img src={InstaLogo} alt="insta" />
                      스토리
                    </p>
                    <p onClick={onClickcopy}>
                      <img src={CopyLink} alt="link" />
                      링크 복사
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="commentWrap answerWrap">
            <div className="profileArea">
              <img src={sent.receivedUserPic} alt="profile2" className="respondent" />
            </div>
            <div className="cnt">
              <p className="Nicname">{sent.receivedUserName}</p>
           
              {sent.answers.length === 0  ? (
                <UntilAnswering></UntilAnswering>
              ) : (
                <>
                <p className="min">{sent.answers[0].createdTime}</p>
                <AnonymousAnswer answers={sent.answers} />
              </>
              )}
              <div className="heart">
                <img src={good} alt="good" onClick={clickGood} />
              </div>
              <div className="more">
                <img src={More} alt="more" onClick={clickMore_1} />
                {del_1 && (
                  <div className="del" onClick={showDelModal}>
                    <p>
                      <img src={Bin} alt="btin" />
                      삭제하기
                    </p>
                  </div>
                )}
              </div>
              <div className="share">
                <img src={Share} alt="share" onClick={showShareModal_1} />
                {share_1 && (
                  <div className="sharePopup">
                    <p>
                      <img src={InstaLogo} alt="insta" />
                      스토리
                    </p>
                    <p onClick={onClickcopy}>
                      <img src={CopyLink} alt="link" />
                      링크 복사
                    </p>
                  </div>
                )}
              </div>
            </div>
            {/* 삭제하기 팝업  */}
            {delModal && <Delete onClose={onClose}></Delete>}
            {/* -- 삭제하기 팝업 */}
          </div>
        </>
      ))}
    </>
  );
}

export default SendComment;
