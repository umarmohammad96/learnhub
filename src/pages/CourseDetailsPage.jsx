import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  BookOpen,
  Check,
  ChevronDown,
  Clock3,
  Play,
  Search,
  Sparkles,
  Star,
} from 'lucide-react';
import { Button } from '../components/ui.jsx';
import { Card } from '../components/ui.jsx';
import { EmptyState } from '../components/ui.jsx';
import { useStore } from '../context/LearnHubContext.jsx';
import { courses } from '../data.js';

export function Details() {
  const { id } = useParams(),
    c = courses.find((x) => x.id === id),
    { enrolled, setEnrolled, bookmarks, setBookmarks, notify } = useStore(),
    [open, setOpen] = useState(0);
  if (!c)
    return (
      <EmptyState
        icon={Search}
        title="Course not found"
        text="This course may have moved."
        action="Back to courses"
        to="/catalog"
      />
    );
  const joined = enrolled.includes(c.id),
    marked = bookmarks.includes(`course:${c.id}`);
  function enroll() {
    if (!joined) {
      setEnrolled([...enrolled, c.id]);
      notify('You’re enrolled. Let’s get started!');
    }
  }
  return (
    <>
      <div className={`detail-banner art-${c.color}`}>
        <div className="detail-banner-glow" />
        <Link to="/catalog" className="back-link">
          <ArrowLeft size={15} /> Course library
        </Link>
        <div className="detail-banner-inner">
          <div>
            <span className="category-chip">{c.category}</span>
            <h1>{c.title}</h1>
            <p>{c.description}</p>
            <div className="detail-meta">
              <span>
                <Star size={15} fill="currentColor" /> {c.rating}{' '}
                <small>(learner rating)</small>
              </span>
              <span>
                <Clock3 size={15} />
                {c.duration}
              </span>
              <span>
                <BookOpen size={15} />
                {c.lessons} lessons
              </span>
            </div>
            <div className="detail-ctas">
              <Button onClick={enroll}>
                {joined ? 'Continue learning' : 'Start this course'}{' '}
                <ArrowRight size={15} />
              </Button>
              <button
                className={`btn glass ${marked ? 'is-marked' : ''}`}
                onClick={() => {
                  setBookmarks(
                    marked
                      ? bookmarks.filter((x) => x !== `course:${c.id}`)
                      : [...bookmarks, `course:${c.id}`],
                  );
                  notify(marked ? 'Bookmark removed' : 'Course saved');
                }}
              >
                <Bookmark size={15} fill={marked ? 'currentColor' : 'none'} />
                {marked ? 'Saved' : 'Save for later'}
              </button>
            </div>
          </div>
          <div className="detail-hero-icon">{c.icon}</div>
        </div>
      </div>
      <div className="details-layout">
        <div>
          <Card className="about-card">
            <div className="eyebrow">A LITTLE ABOUT THIS COURSE</div>
            <h2>Make your next skill feel natural.</h2>
            <p>
              {c.description} Designed for practical progress, this course
              blends clear explanations with small activities you can use right
              away.
            </p>
            <h3>What you’ll be able to do</h3>
            <div className="objective-list">
              {c.learn.map((x) => (
                <div key={x}>
                  <span>
                    <Check size={14} />
                  </span>
                  {x}
                </div>
              ))}
            </div>
            <h3>Meet your instructor</h3>
            <div className="instructor-profile">
              <div className="instructor-large">
                {c.instructor
                  .split(' ')
                  .map((w) => w[0])
                  .join('')}
              </div>
              <div>
                <b>{c.instructor}</b>
                <span>Educator & practitioner · {c.category}</span>
                <p>
                  Passionate about making complex ideas feel simple and useful.
                </p>
              </div>
            </div>
          </Card>
        </div>
        <div className="curriculum-col">
          <Card className="curriculum-card">
            <div className="curriculum-top">
              <div>
                <div className="eyebrow">THE COURSE MAP</div>
                <h2>What we’ll explore</h2>
              </div>
              <span>
                {c.modules.length} modules · {c.lessons} lessons
              </span>
            </div>
            {c.modules.map((m, i) => (
              <div className="module" key={m[0]}>
                <button
                  className="module-head"
                  onClick={() => setOpen(open === i ? -1 : i)}
                >
                  <span className="module-num">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>
                    <b>{m[0]}</b>
                    <small>
                      {m.length - 1} lessons ·{' '}
                      {Math.round((c.lessons / c.modules.length) * 0.25)}h
                    </small>
                  </span>
                  <ChevronDown
                    size={17}
                    className={open === i ? 'rotated' : ''}
                  />
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      className="module-lessons"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                    >
                      {m.slice(1).map((l, j) => (
                        <div className="lesson-row" key={l}>
                          <span className="lesson-play">
                            <Play size={11} fill="currentColor" />
                          </span>
                          <span>{l}</span>
                          <small>{8 + j * 2} min</small>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </Card>
          <div className="prereq">
            <Sparkles size={15} />
            <span>
              <b>No prerequisites</b> — just bring your curiosity.
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
