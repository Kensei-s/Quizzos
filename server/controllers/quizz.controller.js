import db from "../lib/database.js";
import * as schema from "../lib/schema/realtime.js";
import { eq } from "drizzle-orm";
import { quizzes, questions, answers } from "../lib/schema/realtime.js";

export async function getQuizzes() {
  try {
    const quizz = await db.select().from(schema.quizzes).get();
    if (!quizz) {
      return sendResponse(res, 404, "Non trouvé : Quiz introuvable.");
    } else {
      return quizz;
    }
  } catch (error) {
    sendResponse(
      res,
      400,
      "Requête incorrecte : Impossible de récupérer le quiz."
    );
  }
}

export async function createQuestion(quizId, questionText) {
  const newQuestion = {
    quizId: quizId,
    question: questionText,
    createdAt: Math.floor(Date.now() / 1000),
    updatedAt: Math.floor(Date.now() / 1000),
  };

  await questions.insert(newQuestion);
}

export async function createAnswer(questionId, answerText, timer, isCorrect) {
  const newAnswer = {
    questionId: questionId,
    answer: answerText,
    timer: timer,
    isCorrect: isCorrect,
    createdAt: Math.floor(Date.now() / 1000),
    updatedAt: Math.floor(Date.now() / 1000),
  };

  await answers.insert(newAnswer);
}

export async function handleNewQuestion(questionText, answers) {
  console.log(questionText, answers);
}
