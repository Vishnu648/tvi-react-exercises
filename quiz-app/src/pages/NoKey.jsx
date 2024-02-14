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

  return (
    <div className="container">
      <Header />
      {isComplete ? (
        <p className="score">
          <b>SCORE</b>
          {`   ${correctAnswer}/${quizs.length}`}
        </p>
      ) : null}
      {err ? <p className="error">complete the quiz</p> : ""}
      <section id="quizContainer">
        {quizs.map((q, i) => (
          <div key={i} id="singleQuestion">
            <h2>
              {i + 1} - {q.question.text}
            </h2>
            <label
              key={q.correctAnswer}
              htmlFor={q.correctAnswer}
              id="answersLabel"
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
      <button id="submitBtn" onClick={showResult}>
        submit
      </button>
    </div>
  );
}

export default NoKey;
