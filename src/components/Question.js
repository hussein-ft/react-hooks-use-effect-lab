import React, { useState, useEffect } from "react";
function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // useEffect to handle countdown timer
  useEffect(() => {
    let timer;

    if (timeRemaining > 0) {
      timer = setTimeout(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      setTimeRemaining(10); // reset timer
      onAnswered(false);    // auto-answer false if time runs out
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [timeRemaining, onAnswered]);

  function handleAnswer(isCorrect) {
    setTimeRemaining(10); // reset timer on answer
    onAnswered(isCorrect);
  }

  return (
    <div>
      <h2>{question.prompt}</h2>
      <ul>
        {question.answers.map((answer, index) => (
          <li key={index}>
            <button onClick={() => handleAnswer(index === question.correctIndex)}>
              {answer}
            </button>
          </li>
        ))}
      </ul>
      <p>{timeRemaining} seconds left</p>
    </div>
  );
}

export default Question;
