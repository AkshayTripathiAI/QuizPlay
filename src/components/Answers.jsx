import { useEffect, useRef } from "react";

// Fisher-Yates shuffle (sort(() => Math.random() - 0.5) is biased).
function shuffle(items) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export default function Answers({
  answers,
  selectedAnswer,
  answerState,
  onSelect,
}) {
  const shuffledAnswers = useRef();

  if (!shuffledAnswers.current) {
    shuffledAnswers.current = shuffle(answers);
  }

  // Keyboard shortcut: press 1-4 to pick an answer.
  useEffect(() => {
    if (answerState !== "") return;

    function handleKeyDown(event) {
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      const index = Number(event.key) - 1;
      if (Number.isInteger(index) && index >= 0 && index < shuffledAnswers.current.length) {
        onSelect(shuffledAnswers.current[index]);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [answerState, onSelect]);

  return (
    <ul id="answers">
      {shuffledAnswers.current.map((answer, index) => {
        const isSelected = selectedAnswer === answer;
        let cssClasses = "";

        if (answerState === "answered" && isSelected) {
          cssClasses = "selected";
        }
        if (
          (answerState === "correct" || answerState === "wrong") &&
          isSelected
        ) {
          cssClasses = answerState;
        }
        return (
          <li key={answer} className="answer">
            <button
              onClick={() => onSelect(answer)}
              className={cssClasses}
              disabled={answerState !== ""}
            >
              <span className="answer-key" aria-hidden="true">
                {index + 1}
              </span>
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
