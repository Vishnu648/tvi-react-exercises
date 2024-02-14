import { useState, useEffect } from "react";
import Header from "../components/Header";

function WithKey() {
  const [quizs, setQuizs] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [isComplete, setIsComplete] = useState(true);

  useEffect(() => {
    fetch(
      "https://quizapi.io/api/v1/questions?apiKey=cr67FaGJQKBUFZHXI5D2sqBmmjvX0MT2PijGyqmV&category=linux&difficulty=Hard&limit=10"
    )
      .then((res) => res.json())
      .then((ans) => setQuizs(ans));
  }, []);

  let charArr = ["a", "b", "c", "d", "e", "f"];

  return (
    <div className="container">
      <Header />
      <section id="quizContainer">
        {quizs.map((q, i) => (
          <div key={i} id="singleQuestion">
            <h2>
              {i + 1} - {q.question}
            </h2>
           {console.log(q.answers.answer_a)}
          </div>
        ))}
      </section>
    </div>
  );
}

export default WithKey;
