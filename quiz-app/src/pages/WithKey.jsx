import { useState, useEffect } from "react";
import Header from "../components/Header";

function WithKey() {
  const [quizs, setQuizs] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const [err, setErr] = useState(false);

  useEffect(() => {
    fetch(
      "https://quizapi.io/api/v1/questions?apiKey=cr67FaGJQKBUFZHXI5D2sqBmmjvX0MT2PijGyqmV&category=linux&difficulty=Hard&limit=10"
    )
      .then((res) => res.json())
      .then((ans) => setQuizs(ans));
  }, []);

  let charArr = [
    "answer_a",
    "answer_b",
    "answer_c",
    "answer_d",
    "answer_e",
    "answer_f",
  ];

  const handleClick = (obj, selection) => {
    if (selection == obj.correct_answer) {
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

  const tryAgain=() => {
    location.reload() 
  }
  

  return (
    <div className="container">
      <Header />
      {isComplete ? (
        <>
          <p className="score">
            <b>SCORE</b>
            {`   ${correctAnswer}/${quizs.length}`}
          </p>
          <button onClick={tryAgain} id="submitBtn">Try again</button>
        </>
      ) : null}
      {err ? <p className="error">complete the quiz</p> : ""}
      <section id="quizContainer">
        {quizs.map((q, i) => (
          <div key={i} id="singleQuestion">
            <h2>
              {i + 1} - {q.question}
            </h2>
            {charArr.map((c) =>
              q.answers[c] ? (
                <label
                  key={c}
                  htmlFor={q.answers[c]}
                  id="answersLabel"
                  onClick={(e) => handleClick(q, e.target.value)}
                >
                  <input
                    type="radio"
                    value={q.answers[c]}
                    id={q.answers[c]}
                    name={q.question}
                  />
                  {q.answers[c]}
                </label>
              ) : (
                ""
              )
            )}
          </div>
        ))}
      </section>
      <button id="submitBtn" onClick={showResult}>
        submit
      </button>
    </div>
  );
}

export default WithKey;
