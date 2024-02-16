import React from "react";

function Options({correctAnswer,handleClick,q}) {
  return (
    <>
      <label
        key={correctAnswer}
        htmlFor={correctAnswer}
        id="answersLabel"
        className="flex accent-black gap-2 mt-2 mb-2 ml-9"
        onClick={(e) => handleClick(q, e.target.value)}
      >
        <input
          type="radio"
          value={correctAnswer}
          id={correctAnswer}
          name={correctAnswer}
        />
        {correctAnswer}
      </label>
      {q.incorrectAnswers.map((ica) => (
        <label
          key={ica}
          htmlFor={ica}
          id="answersLabel"
          className="flex accent-black gap-2 mt-2 mb-2 ml-9"
          onClick={(e) => handleClick(q, e.target.value)}
        >
          <input type="radio" value={ica} id={ica} name={correctAnswer} />
          {ica}
        </label>
      ))}
    </>
  );
}

export default Options;
