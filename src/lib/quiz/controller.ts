// Client-side flow for the symptom questionnaire. Every screen is rendered by Astro
// (hidden); this only switches screens, stores answers and builds the WhatsApp link.
import { quizQuestions } from '@data/quiz';
import { whatsappLink } from '@data/site';
import { evaluateQuiz, type QuizScores } from './evaluate';
import { buildQuizMessage } from './message';
import { prefersReducedMotion, withHeightTransition } from '@lib/motion';

const ADVANCE_DELAY_MS = 250; // lets the chosen option show as selected before moving on
const EXIT_MS = 200;
const ENTER_MS = 320;
const PROGRESS_MS = 600;
const SLIDE_PX = 24;

type Direction = 'forward' | 'back';

export function initQuiz(root: HTMLElement) {
  const screens = Array.from(root.querySelectorAll<HTMLElement>('[data-quiz-screen]'));
  const questionScreens = screens.filter((s) => s.dataset.quizScreen === 'question');
  const intro = screens.find((s) => s.dataset.quizScreen === 'intro')!;

  let scores: Partial<QuizScores> = {};
  let current = -1; // -1 = intro, 0..n-1 = question index
  let visible = intro;
  let busy = false; // ignores clicks while a transition runs (avoids double answers)

  // Two-step transition: the current screen fades/slides out, then the next one slides in
  // while the card smoothly adapts its height. "back" mirrors the direction.
  const show = async (screen: HTMLElement, direction: Direction) => {
    busy = true;
    const animate = !prefersReducedMotion();
    const offset = direction === 'forward' ? SLIDE_PX : -SLIDE_PX;

    let exit: Animation | undefined;
    if (animate && visible !== screen) {
      exit = visible.animate(
        [{ opacity: 1, transform: 'none' }, { opacity: 0, transform: `translateX(${-offset}px)` }],
        { duration: EXIT_MS, easing: 'ease-in', fill: 'forwards' },
      );
      await exit.finished;
    }

    // The old screen stays in place (invisible) until this point, so the card's height
    // animates straight from the old screen's height to the new one's, without collapsing.
    withHeightTransition(root, () => {
      screens.forEach((s) => (s.hidden = s !== screen));
    });
    // Drop the held fade-out only after the old screen is hidden, so it never flashes back.
    exit?.cancel();
    visible = screen;

    if (animate) {
      screen.animate([{ opacity: 0, transform: `translateX(${offset}px)` }, { opacity: 1, transform: 'none' }], {
        duration: ENTER_MS,
        easing: 'ease-out',
      });
      // The progress bar grows from the previous question's value.
      const bar = screen.querySelector<HTMLElement>('[data-progress-fill]');
      if (bar && direction === 'forward') {
        bar.animate([{ width: bar.style.getPropertyValue('--progress-from') }, { width: bar.style.width }], {
          duration: PROGRESS_MS,
          easing: 'ease-out',
        });
      }
    }

    screen.querySelector<HTMLElement>('[data-quiz-focus]')?.focus({ preventScroll: true });
    if (root.getBoundingClientRect().top < 0) root.scrollIntoView({ behavior: 'smooth', block: 'start' });
    busy = false;
  };

  const goToQuestion = (index: number, direction: Direction) => {
    current = index;
    return show(index < 0 ? intro : questionScreens[index], direction);
  };

  const showResult = () => {
    const finalScores = scores as QuizScores;
    const resultId = evaluateQuiz(finalScores);
    const screen = screens.find((s) => s.dataset.resultId === resultId)!;
    const checkbox = screen.querySelector<HTMLInputElement>('[data-quiz-include]')!;
    const cta = screen.querySelector<HTMLAnchorElement>('[data-quiz-cta]')!;

    const updateCta = () => (cta.href = whatsappLink(buildQuizMessage(resultId, finalScores, checkbox.checked)));
    checkbox.onchange = updateCta;
    updateCta();
    return show(screen, 'forward');
  };

  const reset = () => {
    scores = {};
    root.querySelectorAll('[data-quiz-option]').forEach((o) => o.setAttribute('aria-pressed', 'false'));
    root.querySelectorAll<HTMLInputElement>('[data-quiz-include]').forEach((c) => (c.checked = false));
  };

  root.addEventListener('click', (event) => {
    const target = (event.target as HTMLElement).closest<HTMLElement>(
      '[data-quiz-start], [data-quiz-option], [data-quiz-back], [data-quiz-cancel], [data-quiz-restart]',
    );
    if (!target || busy) return;

    if (target.matches('[data-quiz-start], [data-quiz-restart]')) {
      reset();
      goToQuestion(0, 'forward');
    } else if (target.matches('[data-quiz-back]')) {
      goToQuestion(current - 1, 'back');
    } else if (target.matches('[data-quiz-cancel]')) {
      reset();
      goToQuestion(-1, 'back');
    } else if (target.matches('[data-quiz-option]')) {
      busy = true;
      const screen = questionScreens[current];
      screen.querySelectorAll('[data-quiz-option]').forEach((o) => o.setAttribute('aria-pressed', String(o === target)));
      scores[quizQuestions[current].id] = Number(target.dataset.score);

      setTimeout(
        () => (current < questionScreens.length - 1 ? goToQuestion(current + 1, 'forward') : showResult()),
        ADVANCE_DELAY_MS,
      );
    }
  });
}
