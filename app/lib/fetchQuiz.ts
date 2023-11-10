import { QuizGenreType, QuizQuestion } from "./types";
import he from "he";
import { difficultyDecision } from "./utils";

export default async function fetchQuiz(
  genre: QuizGenreType,
  difficulty: string
) {
  const genreId: Record<QuizGenreType, number> = {
    cs: 18,
    sports: 21,
    geo: 22,
    history: 23,
  };

  try {
    const response = await fetch(
      `https://opentdb.com/api.php?amount=10&category=${genreId[genre]}&difficulty=${difficulty}&type=multiple`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data.results)) {
      throw new Error("Data is not in the expected format.");
    }

    const quizData: QuizQuestion[] = data.results;

    quizData.forEach((question) => {
      question.question = he.decode(question.question);
      question.correct_answer = he.decode(question.correct_answer);
      question.incorrect_answers = [
        ...question.incorrect_answers.map((answer) => he.decode(answer)),
        question.correct_answer,
      ].sort(() => Math.random() - 0.5);
    });
    return quizData;
  } catch (error) {
    console.error("error");
    throw error;
  }
}
