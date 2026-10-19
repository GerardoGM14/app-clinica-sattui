import type { QuestionId, ResultId } from '@data/quiz';

export type QuizScores = Record<QuestionId, number>;

// Scores: 3 = frecuentemente, 2 = a veces, 1 = rara vez, 0 = no.
// Rules are checked from most to least important; the first match wins.
export function evaluateQuiz(scores: QuizScores): ResultId {
  if (scores.bleeding >= 2 || scores.pelvicPain >= 3) return 'priority';
  if (scores.painfulUrination >= 2 || scores.pelvicPain >= 2) return 'pain';
  if (scores.odor >= 2 || scores.discharge >= 2) return 'flora';
  if (scores.itching >= 2) return 'irritation';
  return 'noAlerts';
}
