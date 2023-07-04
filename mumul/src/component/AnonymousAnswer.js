import React from "react";

function AnonymousAnswer({ answers }) {
  if (!answers) {
    return null; // or return an appropriate fallback component or message
  }

  return (
    <div>
      {answers.map((answer, index) => (
        <div key={index}>
          {answer.alternativeAnswerText === null || answer.alternativeAnswerText === "" ? (
            answer.answerText
          ) : (
            <button className="answerBtn">🔒질문자만 볼 수 있는 답변입니다.</button>
          )}
        </div>
      ))}
    </div>
  );
}

export default AnonymousAnswer;
