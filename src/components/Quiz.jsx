import { useState, useCallback } from "react";
import QUESTIONS from "../questions";
import Question from "./Question";
import Summary from "./Summary";

export default function Quiz() {
  // The active question is derived from the answers given so far instead of
  // being stored in a second, separate piece of state.
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length;
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(function handleSelectAnswer(
    selectedAnswer,
  ) {
    setUserAnswers((prevUserAnswers) => {
      if (prevUserAnswers.length >= QUESTIONS.length) return prevUserAnswers;
      return [...prevUserAnswers, selectedAnswer];
    });
  }, []);

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer],
  );

  const handleRestart = useCallback(() => setUserAnswers([]), []);

  if (quizIsComplete) {
    return <Summary userAnswers={userAnswers} onRestart={handleRestart} />;
  }

  return (
    <div id="quiz">
      <Question
        // a new key remounts Question (and its timer/shuffled answers)
        key={activeQuestionIndex}
        index={activeQuestionIndex}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}
