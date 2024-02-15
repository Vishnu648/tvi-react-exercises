import { useState, useEffect } from "react";
import Header from "../components/Header";

function NoKey() {
  const [quizs, setQuizs] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const [err, setErr] = useState(false);

  useEffect(() => {
    fetch("https://the-trivia-api.com/v2/questions")
      .then((res) => res.json())
      .then((ans) => setQuizs(ans));
  }, []);

  const handleClick = (obj, selection) => {
    if (selection == obj.correctAnswer) {
      setCorrectAnswer((prev) => prev + 1);
    }
    !selectedQuestions.includes(obj.id)
      ? setSelectedQuestions((prev) => [...prev, obj.id])
      : "";
  };

  const showResult = () => {
    if (selectedQuestions.length == 10) {
      setIsComplete(true);
      setErr(false);
    } else {
      setIsComplete(false);
      setErr(true);
    }
  };

  const tryAgain = () => {
    location.reload();
  };

  return (
    <div className="flex flex-col items-center">
      <Header />
      {isComplete ? (
        <>
          <p className="mt-2 text-[20px]">
            <b>SCORE</b>
            {`   ${correctAnswer}/${quizs.length}`}
          </p>
          <button className="w-[150px] p-2 flex justify-center self-center bg-black text-white outline-none rounded-lg cursor-pointer mt-2" onClick={tryAgain} id="submitBtn">
            Try again
          </button>
        </>
      ) : null}
      {err ? <p className="text-red-600 text-[20px] mt-2">complete the quiz</p> : ""}
      <section
        id="quizContainer"
        className="border border-black rounded-lg my-[20px] mx-[180px] h-[70vh] w-[60vw] overflow-y-scroll p-5"
      >
        {quizs.map((q, i) => (
          <div
            key={i}
            id="singleQuestion"
            className="my-[15px] border border-gray-600 p-3 rounded-lg"
          >
            <h2 className="text-xl font-semibold">
              {i + 1} - {q.question.text}
            </h2>
            <label
              key={q.correctAnswer}
              htmlFor={q.correctAnswer}
              id="answersLabel"
              className="flex accent-black gap-2 mt-2 mb-2 ml-9"
              onClick={(e) => handleClick(q, e.target.value)}
            >
              <input
                type="radio"
                value={q.correctAnswer}
                id={q.correctAnswer}
                name={q.correctAnswer}
              />
              {q.correctAnswer}
            </label>
            {q.incorrectAnswers.map((ica) => (
              <label
                key={ica}
                htmlFor={ica}
                id="answersLabel"
                className="flex accent-black gap-2 mt-2 mb-2 ml-9"
                onClick={(e) => handleClick(q, e.target.value)}
              >
                <input
                  type="radio"
                  value={ica}
                  id={ica}
                  name={q.correctAnswer}
                />
                {ica}
              </label>
            ))}
          </div>
        ))}
      </section>
      <button id="submitBtn" className="w-[150px] p-2 flex justify-center self-center bg-black text-white outline-none rounded-lg cursor-pointer mt-2" onClick={showResult}>
        submit
      </button>
    </div>
  );
}

export default NoKey;
