import { useState, useEffect } from "react";
import Header from "./components/Header";

function App() {
  const [quizs, setQuizs] = useState([]);

  useEffect(() => {
    fetch("https://the-trivia-api.com/v2/questions")
      .then((res) => res.json())
      .then((ans) => setQuizs(ans));
  }, []);

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
              style={{background:'gray'}}
            >
              <input type="checkbox" id={q.correctAnswer} />
              {q.correctAnswer}
            </label>
            {q.incorrectAnswers.map((ica) => (
              <label key={ica} htmlFor={ica} id="answersLabel">
                <input type="checkbox" id={ica} />
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
