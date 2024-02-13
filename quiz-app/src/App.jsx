import { useState, useEffect } from "react";
import Header from "./components/Header";

function App() {
  const [quizs, setQuizs] = useState([]);

  useEffect(() => {
    fetch("https://the-trivia-api.com/v2/questions")
      .then((res) => res.json())
      .then((ans) => setQuizs(ans));
  }, []);

  const handleClick = (p) => {
    // p==quizs.correctAnswer?console.log('correct'):console.log('incorrect');
    console.log(quizs);
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
              style={{ background: "gray" }}
              onClick={(e) => handleClick(e.target.value)}
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
                onClick={(e) => handleClick(e.target.value)}
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
    </div>
  );
}

export default App;
