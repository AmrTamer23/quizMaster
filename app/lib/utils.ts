import he from "he";
import { QuizQuestion } from "./types";

export function reformattedQuizData(quizData: QuizQuestion[]) {
  quizData?.forEach((question) => {
    question.question = he.decode(question.question);
    question.correct_answer = he.decode(question.correct_answer);
    question.incorrect_answers = [
      ...question.incorrect_answers.map((answer) => he.decode(answer)),
      question.correct_answer,
    ].sort(() => Math.random() - 0.5);
  });

  return quizData;
}

export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedSeconds = remainingSeconds.toFixed().padStart(2, "0");

  return `${minutes}:${formattedSeconds}`;
}

export function difficultyDecision(genrePoints: number) {
  if (genrePoints < 30) {
    return "easy";
  } else if (genrePoints < 70) {
    return "medium";
  } else {
    return "hard";
  }
}
