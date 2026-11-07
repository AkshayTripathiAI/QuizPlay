import { useEffect, useRef, useState } from "react";
import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";
import QUESTIONS from "../questions";

const ANSWER_TIME = 10000;
const SELECTED_TIME = 1000;
const FEEDBACK_TIME = 2000;

export default function Question({ index, onSelectAnswer, onSkipAnswer }) {
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });
  const pendingTimers = useRef([]);

  // Clear the reveal/advance timers if the question unmounts early.
  useEffect(() => () => pendingTimers.current.forEach(clearTimeout), []);

  let timer = ANSWER_TIME;

  if (answer.selectedAnswer) {
    timer = SELECTED_TIME;
  }
  if (answer.isCorrect !== null) {
    timer = FEEDBACK_TIME;
  }

  function handleSelectAnswer(selected) {
    if (answer.selectedAnswer) return; // ignore double clicks / key presses

    setAnswer({
      selectedAnswer: selected,
      isCorrect: null,
    });

    pendingTimers.current.push(
      setTimeout(() => {
        setAnswer({
          selectedAnswer: selected,
          isCorrect: QUESTIONS[index].answers[0] === selected,
        });

        pendingTimers.current.push(
          setTimeout(() => {
            onSelectAnswer(selected);
          }, FEEDBACK_TIME),
        );
      }, SELECTED_TIME),
    );
  }

  let answerState = "";

  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? "correct" : "wrong";
  } else if (answer.selectedAnswer) {
    answerState = "answered";
  }

  return (
    <div id="question">
      <p id="question-overview">
        Question {index + 1} of {QUESTIONS.length}
      </p>
      <QuestionTimer
        key={timer}
        timeout={timer}
        onTimeout={answer.selectedAnswer === "" ? onSkipAnswer : null}
        mode={answerState}
      />
      <h2>{QUESTIONS[index].text}</h2>
      <Answers
        answers={QUESTIONS[index].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        onSelect={handleSelectAnswer}
      />
      {answerState === "" && (
        <p id="skip-action">
          <button type="button" onClick={onSkipAnswer}>
            Skip question
          </button>
        </p>
      )}
      <p className="keyboard-hint">Tip: press 1-4 to answer</p>
    </div>
  );
}
