import React, { useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/ko";
import Heart from "./../img/icHeaderBlack.png";
import LineHeart from "./../img/icHeartWhite.png";
import More from "./../img/icon/icMore.png";
import Share from "./../img/icon/icShare.png";
import Good from "./../img/icon/icGood.png";
import GoodRed from "./../img/icon/icGoodRed.png";
import InstaLogo from "./../img/icon/instaLogo.jpeg";
import CopyLink from "./../img/icon/CopyLink.png";
import Bin from "./../img/icon/icBin.png";
import Comment from "./../img/icon/icChat.png";
import AnonymousAnswer from "./AnonymousAnswer";
import Delete from "./popup/Delete";
import { getReceivedComment } from "../api/getReceivedComment";
import { getSpaceInfo } from "../api/getSpaceInfo";
import UntilAnswering from "./UntilAnswering";
import { DateTimeFormatter, LocalDateTime, ChronoUnit } from "js-joda";
import { ZoneId, ZoneRulesProvider } from "js-joda-timezone";
import AnswerRegister from "./popup/AnswerRegister";
import CantModal from "./popup/CantRegister";

function ReceiveComment({ spaceId, currentUserInfo }) {
  const [receivedComments, setReceivedComments] = useState([]);
  // 질문 삭제 상태값
  const [deleteStates, setDeleteStates] = useState({});

  // 질문데이터 배열 상태값
  const [questionData, setQuestionData] = useState([]);

  // 이동한 스페이스 상태값
  const [spaceOwner, setSpaceOwner] = useState({
    userId: "",
    picture: "",
    name: "",
  });

  useEffect(() => {
    const fetchReceivedComments = async () => {
      try {
        const spaInfo = await getSpaceInfo(spaceId);
        const received = await getReceivedComment(spaceId);

        console.log("received:", received);

        const receivedArray = Object.values(received.data).map(
          (item) => item || {}
        );
        console.log("receivedArray:", receivedArray);
        setReceivedComments(receivedArray);
        setSpaceOwner(spaInfo);

        // deleteStates 배열을 모든 질문에 대해 초기화
        const initialDeleteStates = receivedArray.map(() => false);
        setDeleteStates(initialDeleteStates);
        moment.locale("ko");
      } catch (error) {
        console.error("Error fetching received comments:", error);
      }
    };

    fetchReceivedComments();
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
  //등록불가 모달 오픈 상태값
  const [cantModal, setCantModal] = useState(false);
  const [answerModal, setAnswerModal] = useState(false);

  // 선택한 질문의 고유 ID를 상태값에 저장
  const [selectedQuestionId, setSelectedQuestionId] = useState([]);
  const [selectedQuestionUserId, setSelectedQuestionUserId] = useState([]);
  const [selectedQuestionUserPic, setSelectedQuestionPic] = useState([]);
  const [selectedQuestionText, setSelectedQuestionText] = useState([]);

  // 선택한 질문의 인덱스
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);

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

  // 클릭한 질문에 대한 삭제 상태값 변경
  const clickMore = (index) => {
    setDeleteStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  const clickMore_1 = () => {
    if (del_1) {
      setDelete_1(false);
    } else {
      setDelete_1(true);
    }
  };

  // 삭제하기 클릭 시 모달 오픈
  const showDelModal = (index) => {
    setSelectedQuestionIndex(index); // 선택한 질문의 인덱스를 상태값에 저장
    setDelModal(true);
  };

  // 두번째 답변 등록 시 모달 오픈
  const showCantModal = () => {
    setCantModal(true);
  };

  // 삭제 팝업  닫기
  const onClose = (e) => {
    setDelModal(false);
    setCantModal(false);
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
  const showAnswerModal = (
    questionId,
    sentUserId,
    sentUserPic,
    questionText
  ) => {
    setAnswerModal(true);
    setSelectedQuestionId(questionId); // 선택한 질문의 ID를 상태값에 저장
    setSelectedQuestionUserId(sentUserId); // 선택한 질문의 유저 아이디를 상태값에 저장
    setSelectedQuestionPic(sentUserPic); // 선택한 질문의 유저 사진값을 상태값에 저장
    setSelectedQuestionText(questionText); // 선택한 질문의 내용 상태값에 저장
  };

  const closeAnswerModal = () => {
    setAnswerModal(false);
  };

  const onClickcopy = () => {
    setShare(false);
    alert("링크가 복사 되었습니다");
  };

  return (
    <>
      {receivedComments.length === 0 && <p>첫 질문을 남겨 보세요👻</p>}
      {receivedComments
        .slice()
        .reverse()
        .map((received, index) => (
          <React.Fragment key={index}>
            <div key={index} className="commentWrap questionWrap">
              <div className="profileArea">
                <img
                  src={received.sentUserPic}
                  alt="profile1"
                  className="questioner"
                />
              </div>
              <div className="cnt">
                <p className="Nicname">{received.userId}</p>
                <p className="min">{getTimeDifference(received.createdTime)}</p>
                <p className="commentCnt">{received.questionText}</p>
                <div className="heart">
                  <img src={heart} alt="하트" onClick={clickHeart} />

                  
                  {received.answers.length > 0 ? (
                    <>
                      <img
                        src={Comment}
                        alt="comment"
                        className="chat"
                        onClick={showCantModal}
                      />
                    </>
                  ) : (
                    <>
                    {currentUserInfo.userId !== spaceOwner.userId? (
                      ""
                    ): (
                      <img
                      src={Comment}
                      alt="comment"
                      className="chat"
                      onClick={() =>
                        showAnswerModal(
                          received.id,
                          received.userId,
                          received.sentUserPic,
                          received.questionText
                        )
                      }
                    />
                    )}

                    </>
                  )}
                </div>
                <div className="more">
                  <img src={More} alt="more" onClick={() => clickMore(index)} />
                  {deleteStates[index] && (
                    <div className="del" onClick={() => showDelModal(index)}>
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
                <img
                  src={spaceOwner.picture}
                  alt="profile2"
                  className="respondent"
                />
              </div>
              <div className="cnt">
                <p className="Nicname">{spaceOwner.name}</p>

                {received.answers.length === 0 ? (
                  <UntilAnswering></UntilAnswering>
                ) : (
                  <>
                    <p className="min">
                      {getTimeDifference(received.answers[0].createdTime)}
                    </p>
                    <AnonymousAnswer question={received} answers={received.answers} currentUserInfo={currentUserInfo} />
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
              {/* -- 등록불가 팝업 */}
              {cantModal && <CantModal onClose={onClose}></CantModal>}
            </div>
          </React.Fragment>
        ))}
      {answerModal && (
        <AnswerRegister
          CloseAnswerModal={closeAnswerModal}
          currentUserInfo={currentUserInfo}
          questionId={selectedQuestionId}
          sentUserId={selectedQuestionUserId}
          sentUserPic={selectedQuestionUserPic}
          questionText={selectedQuestionText}
        ></AnswerRegister>
      )}
    </>
  );
}

export default ReceiveComment;

// 질문 등록 시간과 현재 시간 사이의 차이를 계산하는 함수
function getTimeDifference(createdTime) {
  return moment(createdTime).locale("ko").fromNow();
}
