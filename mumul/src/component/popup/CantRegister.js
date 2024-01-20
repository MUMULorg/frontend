import React from "react";
import Close from "../../img/icon/close.png";
import PropTypes from 'prop-types';

export default function CantRegister({ onClose }) {
  return (
    <div className="popupWrap">
      <div className="popup">
        <div className="popupContainer">
          <div className="popupHeader">
            <img src={Close} alt="close" onClick={onClose} />
          </div>
          <div className="popupContent delPopup">
            <p className="popupTitle">
            <span role="img" aria-label="link">
              🐰새로운 무물이 필요합니다🐰
              </span>
              </p>
            <p className="subTitle">
              질문 한 개당 답변 한 개로 제한됩니다.
            </p>
          </div>
          <div className="popupFooter">
            <button className="btnCancel" onClick={onClose}>
              네, 알겠습니다
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

CantRegister.propTypes = {
  onClose: PropTypes.any.isRequired,  
};


