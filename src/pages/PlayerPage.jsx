import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Bookmark,
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Menu,
  Play,
  Sparkles,
} from 'lucide-react';
import { Button, Card, EmptyState } from '../components/ui.jsx';
import { useStore } from '../context/LearnHubContext.jsx';
import { courses, lessonText } from '../data.js';
import { allLessons, progress } from '../utils/courseProgress.js';

export function Player() {
  const { id } = useParams(),
    c = courses.find((x) => x.id === id),
    { enrolled, setEnrolled, done, setDone, notify, bookmarks, setBookmarks } =
      useStore(),
    [idx, setIdx] = useState(0),
    [side, setSide] = useState(true);
  if (!c)
    return (
      <EmptyState
        icon={BookOpen}
        title="Course not found"
        text="That learning path doesn’t exist."
        action="Back to courses"
        to="/catalog"
      />
    );
  if (!enrolled.includes(c.id)) setEnrolled([...enrolled, c.id]);
  const lessons = allLessons(c),
    current = lessons[idx] || lessons[0],
    complete = (done[c.id] || []).includes(current),
    pct = progress(c, done);
  function mark() {
    if (complete) return;
    const next = { ...done, [c.id]: [...(done[c.id] || []), current] };
    setDone(next);
    notify('Lesson complete — nicely done!');
    if (idx < lessons.length - 1) setIdx(idx + 1);
  }
  return (
    <div className={`player-layout ${side ? '' : 'sidebar-collapsed'}`}>
      <aside className="lesson-sidebar">
        <div className="lesson-side-top">
          <button
            className="icon-btn"
            onClick={() => setSide(!side)}
            title="Toggle course outline"
          >
            <Menu size={17} />
          </button>
          <Link to="/learning" className="player-back">
            <ChevronLeft size={15} /> My learning
          </Link>
        </div>
        <div className="lesson-course-name">
          <span className={`course-dot art-${c.color}`}>{c.icon}</span>
          <div>
            <small>NOW LEARNING</small>
            <b>{c.title}</b>
          </div>
        </div>
        <div className="lesson-side-progress">
          <div>
            <span>Course progress</span>
            <b>{pct}%</b>
          </div>
          <div className="progress-track">
            <i style={{ width: `${pct}%` }} />
          </div>
        </div>
        <div className="lesson-modules">
          {c.modules.map((m, mi) => {
            const moduleLessons = m.slice(1);
            const start = c.modules
              .slice(0, mi)
              .reduce((n, x) => n + x.length - 1, 0);
            return (
              <div className="lesson-module" key={m[0]}>
                <div className="lesson-module-title">
                  MODULE {String(mi + 1).padStart(2, '0')} <span>{m[0]}</span>
                </div>
                {moduleLessons.map((l, j) => {
                  const n = start + j,
                    doneLesson = (done[c.id] || []).includes(l);
                  return (
                    <button
                      key={l}
                      className={`lesson-side-item ${idx === n ? 'current' : ''}`}
                      onClick={() => setIdx(n)}
                    >
                      <span className="lesson-state">
                        {doneLesson ? (
                          <Check size={12} />
                        ) : idx === n ? (
                          <Play size={10} fill="currentColor" />
                        ) : (
                          <span />
                        )}
                      </span>
                      <span>{l}</span>
                      <small>{8 + j * 2}m</small>
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      </aside>
      <div className="lesson-main">
        <div className="player-top">
          <div className="crumb">
            {c.title}
            <span>/</span>
            <b>{current}</b>
          </div>
          <button
            className={`icon-btn ${bookmarks.includes(`lesson:${c.id}:${current}`) ? 'is-marked' : ''}`}
            onClick={() => {
              const key = `lesson:${c.id}:${current}`,
                marked = bookmarks.includes(key);
              setBookmarks(
                marked
                  ? bookmarks.filter((x) => x !== key)
                  : [...bookmarks, key],
              );
              notify(marked ? 'Lesson bookmark removed' : 'Lesson bookmarked');
            }}
            aria-label="Bookmark lesson"
          >
            <Bookmark size={17} />
          </button>
        </div>
        <div className="lesson-content">
          <div className="lesson-overline">
            MODULE {Math.floor(idx / (c.lessons / c.modules.length)) + 1}{' '}
            <span>·</span> LESSON {String(idx + 1).padStart(2, '0')}
          </div>
          <h1>{current}</h1>
          <p className="lesson-subtitle">
            A practical step forward in {c.title.toLowerCase()}.
          </p>
          <div className="video-placeholder">
            <div className={`video-art art-${c.color}`}>
              <div className="video-orb" />
              <span className="video-emoji">{c.icon}</span>
              <button
                className="big-play"
                onClick={() => notify('Lesson video is ready to play')}
              >
                <Play size={21} fill="currentColor" />
              </button>
              <div className="video-label">
                <span>LEARNHUB CLASSROOM</span>
                <small>Lesson {String(idx + 1).padStart(2, '0')} · 08:24</small>
              </div>
            </div>
          </div>
          <div className="lesson-text">
            {lessonText(current, c)
              .split('\n\n')
              .map((para, i) => (
                <p key={i}>
                  {para.startsWith('###') ? (
                    <b>{para.replace('### ', '')}</b>
                  ) : (
                    para
                  )}
                </p>
              ))}
          </div>
          <Card className="takeaway">
            <span>
              <Sparkles size={17} />
            </span>
            <div>
              <b>A thought to take with you</b>
              <p>
                Learning sticks when you connect it to something you already
                know. What does this idea remind you of?
              </p>
            </div>
          </Card>
          <div className="lesson-controls">
            <Button
              onClick={() => setIdx(Math.max(0, idx - 1))}
              variant="outline"
              disabled={idx === 0}
            >
              <ChevronLeft size={16} /> Previous lesson
            </Button>
            <div className="lesson-control-right">
              <Button to={`/quiz/${c.id}`} variant="outline">
                <CircleHelp size={14} /> Quick quiz
              </Button>
              <Button onClick={mark} variant={complete ? 'soft' : 'outline'}>
                {complete ? (
                  <>
                    <Check size={15} /> Completed
                  </>
                ) : (
                  <>
                    Mark complete <Check size={15} />
                  </>
                )}
              </Button>
              <Button
                onClick={() =>
                  idx === lessons.length - 1
                    ? notify('You reached the end of this course!')
                    : setIdx(idx + 1)
                }
              >
                {idx === lessons.length - 1 ? 'Finish course' : 'Next lesson'}{' '}
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
