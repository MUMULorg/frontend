import React from "react";
import PropTypes from 'prop-types';

function AnonymousAnswer({ question, answers, currentUserInfo }) {
  if (!answers) {
    return null; // or return an appropriate fallback component or message
  }

  return (
    <div>
      {answers.map((answer, index) => (
        <div key={index}>
          {answer.alternativeAnswerText === null || answer.alternativeAnswerText === "" ? (
               <p className="commentCnt">{answer.answerText}</p>
          ) : (
            question.sendingUserId === currentUserInfo.userId || question.receivingUserId === currentUserInfo.userId ? (
              <p className="commentCnt">{answer.answerText}</p>
            ) : (
              <button className="answerBtn">
                 <span role="img" aria-label="link">
                  </span>🔒질문자만 볼 수 있는 답변입니다.
                  </button>
            )
          )}
        </div>
      ))}
    </div>
  );
}

AnonymousAnswer.propTypes = {
  question: PropTypes.object.isRequired,
  answers: PropTypes.array.isRequired,
  currentUserInfo: PropTypes.object.isRequired,
};

export default AnonymousAnswer;
