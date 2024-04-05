import { useState } from "react";
import "./App.css";

function QuizApp() {
  const [questions] = useState([
    {
      question: "What is the capital of France?",
      options: ["London", "Paris", "Berlin", "Madrid"],
      correct: "Paris",
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Mars", "Venus", "Mercury", "Jupiter"],
      correct: "Mars",
    },
    {
      question: "What is the currency of Japan?",
      options: ["Yen", "Dollar", "Euro", "Pound"],
      correct: "Yen",
    },
    {
      question: 'Who wrote the play "Hamlet"?',
      options: [
        "William Shakespeare",
        "Charles Dickens",
        "Leo Tolstoy",
        "Jane Austen",
      ],
      correct: "William Shakespeare",
    },
  ]);

  const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleRadioChange = (event) => {
    const { value } = event.target;
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = value;
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateScore();
    }
  };

  const calculateScore = () => {
    let newScore = 0;
    answers.forEach((answer, index) => {
      if (answer === questions[index].correct) {
        newScore += 1;
      }
    });
    setScore(newScore);
    setSubmitted(true);
  };

  const resetQuiz = () => {
    setAnswers(Array(questions.length).fill(""));
    setScore(0);
    setSubmitted(false);
    setCurrentQuestionIndex(0);
  };

  const checkAnswer = () => {
    if (
      answers[currentQuestionIndex] === questions[currentQuestionIndex].correct
    ) {
      setAnswers((prevAnswers) => {
        const newAnswers = [...prevAnswers];
        newAnswers[currentQuestionIndex] = "Correct!";
        return newAnswers;
      });
    } else {
      setAnswers((prevAnswers) => {
        const newAnswers = [...prevAnswers];
        newAnswers[currentQuestionIndex] = "Incorrect!";
        return newAnswers;
      });
    }
  };

  return (
    <div className="container">
      <h2>{questions[currentQuestionIndex].question}</h2>
      <form>
        {questions[currentQuestionIndex].options.map((option, index) => (
          <div key={index}>
            <input
              type="radio"
              id={option}
              name="answer"
              value={option}
              checked={answers[currentQuestionIndex] === option}
              onChange={handleRadioChange}
              disabled={submitted}
            />
            <label htmlFor={option}>{option}</label>
          </div>
        ))}
      </form>
      <div className="buttons">
        <button
          onClick={handleNextQuestion}
          disabled={!answers[currentQuestionIndex] || submitted}
        >
          {currentQuestionIndex === questions.length - 1
            ? "Submit"
            : "Next Question"}
        </button>
        {submitted && (
          <>
            <p>
              Your score: {score} out of {questions.length}
            </p>
            <button onClick={resetQuiz}>Try Again</button>
          </>
        )}
        {!submitted && (
          <button
            onClick={checkAnswer}
            disabled={!answers[currentQuestionIndex]}
          >
            Check Answer
          </button>
        )}
      </div>
      <p>{answers[currentQuestionIndex]}</p>
    </div>
  );
}

export default QuizApp;
