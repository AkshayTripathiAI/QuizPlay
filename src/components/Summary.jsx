import { useEffect, useState } from "react";
import quizIsCompleteImg from "../assets/quiz-complete.png";
import QUESTIONS from "../questions";

const BEST_SCORE_KEY = "quizPlay.bestScore";

function readBestScore() {
  try {
    const stored = localStorage.getItem(BEST_SCORE_KEY);
    return stored === null ? null : Number(stored);
  } catch {
    return null;
  }
}

export default function Summary({ userAnswers, onRestart }) {
  const skippedAnswers = userAnswers.filter((answer) => answer === null);
  const correctAnswers = userAnswers.filter(
    (answer, index) => answer === QUESTIONS[index].answers[0],
  );
  const skippedAnswersShare = Math.round(
    (skippedAnswers.length / userAnswers.length) * 100,
  );

  const correctAnswersShare = Math.round(
    (correctAnswers.length / userAnswers.length) * 100,
  );

  const wrongAnswersShare = Math.max(
    100 - skippedAnswersShare - correctAnswersShare,
    0,
  );

  // Read the previous best once, then save this round if it beats it.
  const [previousBest] = useState(readBestScore);
  const score = correctAnswers.length;
  const isNewBest = previousBest === null || score > previousBest;
  const bestScore = isNewBest ? score : previousBest;

  useEffect(() => {
    if (!isNewBest) return;
    try {
      localStorage.setItem(BEST_SCORE_KEY, String(score));
    } catch {
      // ignore storage errors
    }
  }, [isNewBest, score]);

  return (
    <div id="summary">
      <img src={quizIsCompleteImg} alt="Trophy" />
      <h2>Quiz Complete</h2>
      <p className="summary-score">
        You scored <strong>{score}</strong> out of {QUESTIONS.length}.{" "}
        {isNewBest && score > 0 ? (
          <strong>New best score!</strong>
        ) : (
          <>Best: {bestScore}</>
        )}
      </p>
      <div id="summary-stats">
        <p>
          <span className="number">{skippedAnswersShare}%</span>
          <span className="text">skipped</span>
        </p>
        <p>
          <span className="number">{correctAnswersShare}%</span>
          <span className="text">answered correctly</span>
        </p>
        <p>
          <span className="number">{wrongAnswersShare}%</span>
          <span className="text">answered incorrectly</span>
        </p>
      </div>
      <ol>
        {userAnswers.map((answer, index) => {
          const correctAnswer = QUESTIONS[index].answers[0];
          let cssClass = "user-answer ";

          if (answer === null) {
            cssClass += "skipped";
          } else if (answer === correctAnswer) {
            cssClass += "correct";
          } else {
            cssClass += "wrong";
          }
          return (
            <li key={QUESTIONS[index].id}>
              <h3>{index + 1}</h3>
              <p className="question">{QUESTIONS[index].text}</p>
              <p className={cssClass}>{answer ?? "skipped"}</p>
              {answer !== correctAnswer && (
                <p className="correct-answer">Correct answer: {correctAnswer}</p>
              )}
            </li>
          );
        })}
      </ol>
      <p className="summary-actions">
        <button type="button" onClick={onRestart} autoFocus>
          Play again
        </button>
      </p>
    </div>
  );
}
