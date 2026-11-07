import { useState, useEffect } from "react";

export default function QuestionTimer({ timeout, onTimeout, mode }) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    // Only schedule a timeout when there is something to call
    // (setTimeout(null) would try to evaluate the string "null").
    if (!onTimeout) return;
    const timer = setTimeout(onTimeout, timeout);

    // cleanup function
    return () => {
      clearTimeout(timer);
    };
  }, [timeout, onTimeout]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevRemainingTime) =>
        Math.max(prevRemainingTime - 100, 0),
      );
    }, 100);

    // cleanup function
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <progress
      className={mode}
      id="question-time"
      max={timeout}
      value={remainingTime}
      aria-label="Time remaining"
    />
  );
}
