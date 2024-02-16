import React from "react";

function Score({ isComplete, quizLength, tryAgain, correctAnswer }) {
  return (
    <>
      {isComplete ? (
        <>
          <p className="mt-2 text-[20px]">
            <b>SCORE</b>
            {`   ${correctAnswer}/${quizLength}`}
          </p>
          <button
            className="w-[150px] p-2 flex justify-center self-center bg-black text-white outline-none rounded-lg cursor-pointer mt-2"
            onClick={tryAgain}
            id="submitBtn"
          >
            Try again
          </button>
        </>
      ) : null}
    </>
  );
}

export default Score;
