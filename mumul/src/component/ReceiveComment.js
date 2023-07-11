import React, { useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/ko";
import More from "./../img/icon/icMore.png";
import Bin from "./../img/icon/icBin.png";
import Comment from "./../img/icon/icChat.png";
import AnonymousAnswer from "./AnonymousAnswer";
import Delete from "./popup/QDelete";
import { getReceivedComment } from "../api/Q&A/getReceivedComment";
import { getSpaceInfo } from "../api/getSpaceInfo";
import UntilAnswering from "./UntilAnswering";
import AnswerRegister from "./popup/AnswerRegister";
import CantModal from "./popup/CantRegister";
import ADelete from "./popup/ADelete";
import AnswerBtn from "./AnswerButton";
import Profile1 from "./../img/Ellipse 103.png";
import Profile2 from "./../img/Ellipse 104.png";
// import Share from "./../img/icon/icShare.png";
// import CopyLink from "./../img/icon/CopyLink.png";

function ReceiveComment({ spaceId, currentUserInfo }) {
  const [receivedComments, setReceivedComments] = useState([]);
  // 질문 삭제 상태값
  const [deleteStates, setDeleteStates] = useState({});
  // 답변 삭제 상태값
  const [a_deleteStates, a_setDeleteStates] = useState({});

  // 질문 공유 상태값
  const [shareStates, setShareStates] = useState({});

  //질문 삭제 모달 오픈 상태값
  const [delModal, setDelModal] = useState(false);
  //답변 삭제 모달 오픈 상태값
  const [a_delModal, a_setDelModal] = useState(false);
  //등록불가 모달 오픈 상태값
  const [cantModal, setCantModal] = useState(false);
  const [answerModal, setAnswerModal] = useState(false);

  // 선택한 답변의 고유 ID를 상태값에 저장
  const [selectedAnswerId, setSelectedAnswerId] = useState([]);

  // 선택한 질문의 고유 ID를 상태값에 저장
  const [selectedQuestionId, setSelectedQuestionId] = useState([]);

  const [selectedQuestionUserId, setSelectedQuestionUserId] = useState([]);
  const [selectedQuestionUserPic, setSelectedQuestionPic] = useState([]);
  const [selectedQuestionText, setSelectedQuestionText] = useState([]);

  // 선택한 질문의 스페이스 ID와 유저 ID를 상태값에 저장
  const [selectedSpaceId, setSelectedSpaceId] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState([]);


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

        const receivedArray = Object.values(received.data).map(
          (item) => item || {}
        );

        setReceivedComments(receivedArray);
        setSpaceOwner(spaInfo);

        // deleteStates 배열을 모든 질문에 대해 초기화
        const initialDeleteStates = receivedArray.map(() => false);
        setDeleteStates(initialDeleteStates);
        a_setDeleteStates(initialDeleteStates);
        setShareStates(initialDeleteStates);
      } catch (error) {
        console.error("Error fetching received comments:", error);
      }
    };

    fetchReceivedComments();
  }, [spaceId]);

  // 클릭한 질문에 대한 삭제 상태값 변경
  const clickMore = (index) => {
    setDeleteStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  // 클릭한 답변에 대한 삭제 상태값 변경
  const clickMore_1 = (index) => {
    a_setDeleteStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  // 클릭한 질문에 대한 공유하기 상태값 변경
  const clickMore_s = (index) => {
    setShareStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  // 질문 삭제하기 클릭 시 모달 오픈
  const showDelModal = (questionId, spaceId, userId) => {
    // 삭제하기 드랍다운 지우기
    setDeleteStates("");
    setSelectedQuestionId(questionId); // 선택한 질문의 ID를 상태값에 저장
    setSelectedSpaceId(spaceId); // 선택한 질문의 스페이스 ID를 상태값에 저장
    setSelectedUserId(userId); // 선택한 질문의 유저 ID를 상태값에 저장
    setDelModal(true);
  };

  // 답변 삭제하기 클릭 시 모달 오픈
  const a_showDelModal = (answerId, spaceId, userId) => {
    setSelectedAnswerId(answerId); // 선택한 질문의 ID를 상태값에 저장
    setSelectedSpaceId(spaceId); // 선택한 질문의 스페이스 ID를 상태값에 저장
    setSelectedUserId(userId); // 선택한 질문의 유저 ID를 상태값에 저장
    a_setDelModal(true);
  };

  // 두번째 답변 등록 시 모달 오픈
  const showCantModal = () => {
    setCantModal(true);
  };

  // 삭제 팝업  닫기
  const onClose = (e) => {
    setDelModal(false);
    a_setDelModal(false);
    setCantModal(false);
    // setShare(false);
  };

  //공유하기  오픈
  // const showShareModal = (questionId) => {
  //   setSelectedQuestionId(questionId); // 선택한 질문의 ID를 상태값에 저장
  //   setShare(true);
  // };

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

  // const onClickCopy = (questionId, spaceId) => {
  //   setShareStates("");
  //   navigator.clipboard.writeText(`localhost:3000/spaces/${spaceId}/#sent/${questionId}`)
  //     .then(() => {
  //       alert("링크가 복사되었습니다");
  //     })
  //     .catch((error) => {
  //       console.error("클립보드 복사 오류:", error);
  //     });
  
  //   // 브라우저 창에 포커스 주기
  //   window.focus();
  // };


  return (
    <>
      {receivedComments.length === 0 && 
      <>
      <div className="commentWrap questionWrap">
        <div className="profileArea">
          <img src={Profile1} alt="profile1" className="questioner" />
        </div>
        <div className="cnt">
          <p className="Nicname">익명의 토끼</p>
          <p className="min">20분 전🔒</p>
          <p className="commentCnt">
            새로운 질문을 써주세요! 아직 질문이 없어요!
          </p>
        </div>
      </div>
      <div className="commentWrap answerWrap">
        <div className="profileArea">
          <img src={Profile2} alt="profile2" className="respondent" />
        </div>
        <div className="cnt">
          <AnswerBtn></AnswerBtn>
        </div>
      </div>
      </>
      }
      {receivedComments
        .slice()
        .reverse()
        .map((received, index) => (
          <React.Fragment key={received.id}>
            <div key={received.id} className="commentWrap questionWrap">
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
                      {currentUserInfo.userId !== spaceOwner.userId ? (
                        ""
                      ) : (
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
                    <div
                      className="del"
                      onClick={() =>
                        showDelModal(
                          received.id,
                          spaceId,
                          currentUserInfo.userId
                        )
                      }
                    >
                      <p>
                        <img src={Bin} alt="btin" />
                        삭제하기
                      </p>
                    </div>
                  )}
                </div>
                {/* <div className="share">
                  <img src={Share} alt="share" onClick={() => clickMore_s(index)}  />
                  {shareStates[index] && (
                    <div className="sharePopup">
                      <p onClick={() => onClickCopy(received.id, spaceId)}>
                        <img src={CopyLink} alt="link" />
                        링크 복사
                      </p>
                    </div>
                  )}
                </div> */}
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
                    <AnonymousAnswer
                      question={received}
                      answers={received.answers}
                      currentUserInfo={currentUserInfo}
                    />
                  </>
                )}

                {received.answers.length === 0 ? (
                  ""
                ) : (
                  <>
                    <div className="more">
                      <img
                        src={More}
                        alt="more"
                        onClick={() => clickMore_1(index)}
                      />
                      {a_deleteStates[index] && (
                        <div
                          className="del"
                          onClick={() =>
                            a_showDelModal(
                              received.answers[0].id,
                              spaceId,
                              currentUserInfo.userId
                            )
                          }
                        >
                          <p>
                            <img src={Bin} alt="btin" />
                            삭제하기
                          </p>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* 질문 삭제하기 팝업  */}
              {delModal && (
                <Delete
                  questionId={selectedQuestionId}
                  spaceId={selectedSpaceId} // 스페이스 ID 전달
                  userId={selectedUserId} // 유저 ID 전달
                  onClose={onClose}
                ></Delete>
              )}
              {/* 답변 삭제하기 팝업  */}
              {a_delModal && (
                <ADelete
                  answerId={selectedAnswerId}
                  spaceId={selectedSpaceId} // 스페이스 ID 전달
                  userId={selectedUserId} // 유저 ID 전달
                  onClose={onClose}
                ></ADelete>
              )}
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
