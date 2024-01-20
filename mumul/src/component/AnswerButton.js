import React from "react";

function AnswerBtn() {
  return (
    <div>
      <button className="answerBtn">
        <span role="img" aria-label="link">
          🔒질문자만 볼 수 있는 답변입니다.
        </span>
      </button>
    </div>
  );
}

export default AnswerBtn;