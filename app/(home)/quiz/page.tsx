"use client";
import { FiCpu } from "react-icons/fi";
import { GiEarthAfricaEurope } from "react-icons/gi";
import { IoBasketballOutline } from "react-icons/io5";
import { MdOutlineHistoryEdu } from "react-icons/md";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { formatTime } from "@/app/utils/helpers";
import { useRouter } from "next/navigation";
import { userContext } from "@/app/context/UserContext";

function QuizPage() {
  const currGenre = useSearchParams().get("category");
  const router = useRouter();
  const { user, updateUserPoints } = userContext();

  const genres = {
    cs: { title: "Computer Science", icon: <FiCpu size={40} /> },
    geo: { title: "Geography", icon: <GiEarthAfricaEurope size={70} /> },
    history: { title: "History", icon: <MdOutlineHistoryEdu size={70} /> },
    sports: { title: "Sports", icon: <IoBasketballOutline size={80} /> },
  };

  const selectedGenre = genres[currGenre as keyof typeof genres];

  const quizData = [
    {
      question: "What is the purpose of the 'if' statement in programming?",
      options: [
        "To declare a variable",
        "To perform a loop",
        "To define a function",
        "To make conditional decisions",
      ],
      correctAnswer: 3,
    },
    {
      question: "What does HTML stand for?",
      options: [
        "Hyper Transfer Markup Language",
        "Hyper Text Markup Language",
        "High Tech Multi-Language",
        "Hyperlink and Text Markup Language",
      ],
      correctAnswer: 1,
    },
    {
      question:
        "Which programming language is often used for developing mobile applications?",
      options: ["Java", "Python", "C++", "Ruby"],
      correctAnswer: 0,
    },
    {
      question: "What does RAM stand for in computer terms?",
      options: [
        "Random Access Memory",
        "Read-Only Memory",
        "Real-time Application Memory",
        "Rapid Access Module",
      ],
      correctAnswer: 0,
    },
    {
      question:
        "Which data structure follows the Last-In-First-Out (LIFO) order?",
      options: ["Queue", "Stack", "Linked List", "Array"],
      correctAnswer: 1,
    },
    {
      question: "What is the purpose of the 'if' statement in programming?",
      options: [
        "To declare a variable",
        "To perform a loop",
        "To define a function",
        "To make conditional decisions",
      ],
      correctAnswer: 3,
    },
    {
      question: "What does HTML stand for?",
      options: [
        "Hyper Transfer Markup Language",
        "Hyper Text Markup Language",
        "High Tech Multi-Language",
        "Hyperlink and Text Markup Language",
      ],
      correctAnswer: 1,
    },
    {
      question:
        "Which programming language is often used for developing mobile applications?",
      options: ["Java", "Python", "C++", "Ruby"],
      correctAnswer: 0,
    },
    {
      question: "What does RAM stand for in computer terms?",
      options: [
        "Random Access Memory",
        "Read-Only Memory",
        "Real-time Application Memory",
        "Rapid Access Module",
      ],
      correctAnswer: 0,
    },
    {
      question:
        "Which data structure follows the Last-In-First-Out (LIFO) order?",
      options: ["Queue", "Stack", "Linked List", "Array"],
      correctAnswer: 1,
    },
  ];

  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);

  const handleSelectAnswer = (index: number) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestionIndex] = index;
    setSelectedAnswers(newSelectedAnswers);
  };

  const [score, setScore] = useState(0);

  useEffect(() => {
    let newScore = 0;
    for (let i = 0; i < quizData.length; i++) {
      if (quizData[i].correctAnswer === selectedAnswers[i]) {
        newScore += 1;
      }
    }
    setScore(newScore);
  }, [selectedAnswers]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleNextQuestion = () => {
    if (currentQuestionIndex === quizData.length - 1) {
      sessionStorage.setItem(
        "quizResult",
        JSON.stringify({
          score: score,
          genre: selectedGenre.title,
        })
      );
      score > 5 && updateUserPoints(user.uid, score);
      router.push("/quiz/result");
      return;
    }
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes

  useEffect(() => {
    // Create a timer to count down
    const timer = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      } else {
        // Time's up, handle this situation
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const progress = (currentQuestionIndex / 10) * 100;

  return (
    <div className="flex flex-col justify-center items-center w-full h-full lg:px-96">
      <span className="flex justify-between w-11/12 mb-5">
        <span className="flex items-center gap-3 text-2xl">
          {selectedGenre?.icon} {`${selectedGenre.title} Quiz`}
        </span>
        <span className="text-2xl self-end font-mono">
          Time Left : {formatTime(timeLeft)}
        </span>
      </span>
      <div className="h-1 w-11/12 relative">
        <span
          className=" bg-secondary h-full absolute"
          style={{ width: `${progress}%` }}
        ></span>
      </div>
      <div className="h-3/5 w-full bg-gray-200 rounded-2xl flex flex-col px-14 py-8 gap-4">
        <h5 className="text-gray-600">Q{currentQuestionIndex + 1}</h5>
        <h2 className="text-2xl">{quizData[currentQuestionIndex].question}</h2>
        <section className="mt-5 flex flex-col gap-5">
          {quizData[currentQuestionIndex].options.map((option, index) => (
            <span
              key={index}
              className="text-lg p-2 rounded-lg cursor-pointer"
              onClick={() => handleSelectAnswer(index)}
              style={{
                backgroundColor:
                  index === selectedAnswers[currentQuestionIndex]
                    ? "#FFFFFF"
                    : "",
              }}
            >
              {String.fromCharCode(65 + index)}. {option}
            </span>
          ))}
        </section>
        <span className="flex justify-between items-end h-full">
          <button
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            className="bg-gray-600 rounded-lg px-10 py-2 text-white disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Previous Question
          </button>
          <button
            onClick={handleNextQuestion}
            className={`${
              currentQuestionIndex === quizData.length - 1
                ? "bg-emerald-700"
                : "bg-secondary"
            } rounded-lg px-10 py-2 text-white`}
          >
            {currentQuestionIndex === quizData.length - 1
              ? "Submit"
              : "Next Question"}
          </button>
        </span>
      </div>
    </div>
  );
}

export default QuizPage;
