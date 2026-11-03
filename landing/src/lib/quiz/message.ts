import { quizOptions, quizQuestions, quizResults, type ResultId } from '@data/quiz';
import type { QuizScores } from './evaluate';

/** WhatsApp message sent from the result screen, optionally listing every answer. */
export function buildQuizMessage(resultId: ResultId, scores: QuizScores, includeAnswers: boolean): string {
  const lines = [
    'Hola, completé el cuestionario de síntomas y quisiera agendar una consulta.',
    `Resultado: ${quizResults[resultId].title}.`,
  ];

  if (includeAnswers) {
    lines.push('', 'Mis respuestas:');
    quizQuestions.forEach((question, i) => {
      const answer = quizOptions.find((option) => option.score === scores[question.id])?.label ?? '-';
      lines.push(`${i + 1}. ${question.text} ${answer}`);
    });
  }

  return lines.join('\n');
}
