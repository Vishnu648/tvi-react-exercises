import { useState, useEffect, Fragment,useContext } from "react";
import Header from "../components/Header";
import Score from "../components/Score";
import Error from "../components/Error";
import Question from "../components/Question";
import SubmitButton from "../components/SubmitButton";
import WithKeyOptoins from "../components/WithKeyOptoins";

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

  const tryAgain = () => {
    location.reload();
  };

  return (
    <div className="flex flex-col items-center">
      <Header />
      <Score
        isComplete={isComplete}
        quizLength={quizs.length}
        tryAgain={tryAgain}
        correctAnswer={correctAnswer}
      />

      <Error err={err} />

      <section
        id="quizContainer"
        className="border border-black rounded-lg mt-6 h-[70vh] w-[90vw] md:w-[60vw] overflow-y-scroll p-5"
      >
        {quizs.map((q, i) => (
          <div
            key={i}
            id="singleQuestion"
            className="my-[15px] border border-gray-600 p-3 rounded-lg"
          >
            <Question i={i + 1} question={q.question} />

            {charArr.map((c) =>
            <Fragment key={c}>

              <WithKeyOptoins q={q} handleClick={handleClick} c={c} />
            </Fragment>
            )}
          </div>
        ))}
      </section>
      <SubmitButton showResult={showResult} />
    </div>
  );
}

export default WithKey;
