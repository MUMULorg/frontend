import React from "react";
import Close from "../../img/icon/close.png";
import { deleteAnswer} from "../../api/Q&A/deleteAnswer"
import PropTypes from 'prop-types';

function ADelete({ answerId,  onClose , spaceId, userId}) {

  console.log(`spaceId는 ${spaceId},answerId는 ${answerId}, ,userId는 ${userId}`);
  
    const delete_ = async () => {
      try {
        await deleteAnswer(spaceId, answerId, userId);
        onClose(); // 답변 삭제 후 팝업을 닫습니다.
        window.location.reload();
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.error("로그인이 필요합니다.");
          // 로그인이 필요한 경우에 대한 처리를 추가합니다.
        } else {
          console.error("답변 삭제에 실패함:", error);
          // 필요한 에러 처리 로직을 추가합니다.
        }
      }
    };


  return (
    <div className="popupWrap">
      <div className="popup">
        <div className="popupContainer">
          <div className="popupHeader">
            <img src={Close} alt="close" onClick={onClose} />
          </div>
          <div className="popupContent delPopup">
            <p className="popupTitle">정말로 삭제를 원하시나요?</p>
            <p className="subTitle">
              데이터는 즉시 삭제되어 복구 불가능합니다.
            </p>
          </div>
          <div className="popupFooter">
            <button className="btnRed" onClick={delete_}>삭제</button>
            <button className="btnCancel" onClick={onClose}>
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

ADelete.propTypes = {
  answerId: PropTypes.any.isRequired,
  onClose: PropTypes.any.isRequired,
  spaceId: PropTypes.any.isRequired,
  userId: PropTypes.any.isRequired,
};
export default ADelete;
