import { useState, useEffect, useContext } from "react";
import Header from "../components/Header";
import Score from "../components/Score";
import Error from "../components/Error";
import Question from "../components/Question";
import Options from "../components/Options";
import SubmitButton from "../components/SubmitButton";
import {MarkContext } from '../App'

function NoKey() {
  const [quizs, setQuizs] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const [err, setErr] = useState(false);
  const {globalMark,setGlobalMark}=useContext(MarkContext)

  useEffect(() => {
    fetch("https://the-trivia-api.com/v2/questions")
      .then((res) => res.json())
      .then((ans) => setQuizs(ans));
  }, []);

  const handleClick = (obj, selection) => {
    if (selection == obj.correctAnswer) {
      setCorrectAnswer((prev) => prev + 1);
      setGlobalMark((prev) => prev + 1);
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
    console.log('globalMark-----',globalMark);
    console.log('setglobal-----',setGlobalMark);
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
            <Question i={i + 1} question={q.question.text} />
            <Options
              correctAnswer={q.correctAnswer}
              handleClick={handleClick}
              q={q}
            />
          </div>
        ))}
      </section>
     <SubmitButton showResult={showResult}/>
    </div>
  );
}

export default NoKey;
