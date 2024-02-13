import { useState, useEffect } from "react";
import Header from "./components/Header";

function App() {
  const [quizs, setQuizs] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState(0);

  useEffect(() => {
    fetch("https://the-trivia-api.com/v2/questions")
      .then((res) => res.json())
      .then((ans) => setQuizs(ans));
  }, []);

  const handleClick = (obj, selection) => {
    selection == obj.correctAnswer
      ? setCorrectAnswer((prev) => prev + 1)
      : null;
  };

  const showResult = () => {
    alert(`${correctAnswer}/${quizs.length}`);
  };

  return (
    <div className="container">
      <Header />
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

export default App;
