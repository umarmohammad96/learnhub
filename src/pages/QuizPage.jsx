import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CircleHelp,
  Sparkles,
} from 'lucide-react';
import { Button } from '../components/ui.jsx';
import { Card } from '../components/ui.jsx';
import { EmptyState } from '../components/ui.jsx';
import { useStore } from '../context/LearnHubContext.jsx';
import { courses } from '../data.js';

export const questions = [
  {
    q: 'What is the main benefit of breaking a big challenge into smaller steps?',
    o: [
      'It makes the work disappear',
      'It makes progress easier to see and manage',
      'It guarantees a perfect result',
      'It removes the need to practice',
    ],
    a: 1,
    e: 'Small, manageable steps make progress visible and keep complex work approachable.',
  },
  {
    q: 'When learning a new concept, what helps it stick?',
    o: [
      'Reading it once quickly',
      'Avoiding examples',
      'Connecting it to what you already know',
      'Memorizing every definition',
    ],
    a: 2,
    e: 'Connecting new ideas to existing knowledge makes them easier to recall and use.',
  },
  {
    q: 'What is a useful way to learn from an experiment?',
    o: [
      'Change many things at once',
      'Note what you expected and what happened',
      'Skip the result if it is unexpected',
      'Repeat without reflection',
    ],
    a: 1,
    e: 'Comparing your expectation with the result helps you understand cause and effect.',
  },
  {
    q: 'What does consistent practice build over time?',
    o: [
      'A habit and deeper understanding',
      'Only faster reading',
      'Perfect knowledge immediately',
      'A need for longer lessons',
    ],
    a: 0,
    e: 'Regular practice builds both the habit of showing up and lasting understanding.',
  },
];

export function Quiz() {
  const { id } = useParams(),
    c = courses.find((x) => x.id === id),
    { setScores, scores, notify } = useStore();
  const [step, setStep] = useState(0),
    [choice, setChoice] = useState(null),
    [answers, setAnswers] = useState([]),
    [submitted, setSubmitted] = useState(false),
    [review, setReview] = useState(false);
  if (!c)
    return (
      <EmptyState
        icon={CircleHelp}
        title="Quiz not found"
        text="Choose a course to practice."
        action="Explore courses"
        to="/catalog"
      />
    );
  const finish = answers.length === questions.length;
  const score = answers.filter((a, i) => a === questions[i].a).length,
    pct = Math.round((score / questions.length) * 100);
  function submit() {
    if (choice === null) return;
    const next = [...answers.slice(0, step), choice];
    setAnswers(next);
    setSubmitted(true);
    if (step === questions.length - 1) {
      setScores([...scores, pct]);
      notify('Quiz attempt saved');
    }
  }
  function next() {
    setStep(step + 1);
    setChoice(null);
    setSubmitted(false);
  }
  function retry() {
    setStep(0);
    setChoice(null);
    setAnswers([]);
    setSubmitted(false);
    setReview(false);
  }
  return (
    <div className="quiz-wrap">
      <Link to={`/learn/${c.id}`} className="back-link">
        <ArrowLeft size={15} /> Back to lesson
      </Link>
      <div className="quiz-heading">
        <div className="quiz-spark">
          <Sparkles size={20} />
        </div>
        <div className="eyebrow">CHECK WHAT STUCK</div>
        <h1>A little practice.</h1>
        <p>{c.title} · Quick knowledge check</p>
      </div>
      {finish ? (
        <Card className="quiz-result">
          <div className="result-ring" style={{ '--pct': `${pct * 3.6}deg` }}>
            <div>
              <b>{pct}%</b>
              <span>YOUR SCORE</span>
            </div>
          </div>
          <div className="eyebrow">
            {pct >= 70 ? 'NICELY DONE' : 'A GREAT PLACE TO GROW'}
          </div>
          <h2>{pct >= 70 ? 'You’ve got this.' : 'Keep exploring.'}</h2>
          <p>
            You got{' '}
            <b>
              {score} of {questions.length}
            </b>{' '}
            questions correct.
          </p>
          <div className="result-stats">
            <span>
              <b>{score}</b>Correct
            </span>
            <span>
              <b>{questions.length - score}</b>To revisit
            </span>
            <span>
              <b>{questions.length}</b>Total
            </span>
          </div>
          <div className="result-actions">
            <Button onClick={() => setReview(!review)} variant="outline">
              {review ? 'Hide' : 'Review'} answers
            </Button>
            <Button onClick={retry}>
              Try again <ArrowRight size={15} />
            </Button>
          </div>
          {review && (
            <div className="review-list">
              {questions.map((q, i) => (
                <div key={q.q}>
                  <b>
                    {i + 1}. {q.q}
                  </b>
                  <p
                    className={
                      answers[i] === q.a ? 'correct-answer' : 'wrong-answer'
                    }
                  >
                    {answers[i] === q.a ? '✓' : '↗'} Your answer:{' '}
                    {q.o[answers[i]]}
                  </p>
                  <p className="explanation">{q.e}</p>
                </div>
              ))}
            </div>
          )}
        </Card>
      ) : (
        <Card className="quiz-card">
          <div className="quiz-progress-head">
            <span>
              QUESTION {String(step + 1).padStart(2, '0')}{' '}
              <i>/ {String(questions.length).padStart(2, '0')}</i>
            </span>
            <span>{Math.round((step / questions.length) * 100)}% complete</span>
          </div>
          <div className="progress-track">
            <i style={{ width: `${(step / questions.length) * 100}%` }} />
          </div>
          <h2>{questions[step].q}</h2>
          <div className="answer-options">
            {questions[step].o.map((o, i) => (
              <button
                className={`answer-option ${choice === i ? 'chosen' : ''} ${submitted && i === questions[step].a ? 'correct' : ''} ${submitted && choice === i && i !== questions[step].a ? 'incorrect' : ''}`}
                key={o}
                onClick={() => !submitted && setChoice(i)}
              >
                <span className="answer-letter">{['A', 'B', 'C', 'D'][i]}</span>
                {o}
                {submitted && i === questions[step].a && <Check size={17} />}
              </button>
            ))}
          </div>
          {submitted && (
            <div className="answer-explanation">
              <Sparkles size={15} />
              <span>{questions[step].e}</span>
            </div>
          )}
          <div className="quiz-bottom">
            <span>Take your time. You’ve got this.</span>
            {submitted ? (
              <Button onClick={next}>
                {step === questions.length - 1
                  ? 'See my results'
                  : 'Next question'}{' '}
                <ArrowRight size={15} />
              </Button>
            ) : (
              <Button onClick={submit} disabled={choice === null}>
                Check answer <ArrowRight size={15} />
              </Button>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}
