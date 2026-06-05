import { onDocumentCreated } from "firebase-functions/v2/firestore";
import { logger } from "firebase-functions";

export const onQuizSubmitted = onDocumentCreated("Quizzes/{quizId}", (event) => {
  const data = event.data?.data();
  logger.info("Quiz submitted", {
    quizId: event.params.quizId,
    userId: data?.userId,
    score: data?.score,
  });
});
