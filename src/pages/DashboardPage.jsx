import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  Clock3,
  Target,
  Trophy,
  Zap,
} from 'lucide-react';
import { Button, Card, EmptyState } from '../components/ui.jsx';
import { ContinueCard, MiniCourse } from '../components/CourseProgressCards.jsx';
import { useStore } from '../context/LearnHubContext.jsx';
import { courses } from '../data.js';
import { progress } from '../utils/courseProgress.js';

export function Dashboard() {
  const { user, enrolled, done, scores } = useStore();
  const active = enrolled
    .map((id) => courses.find((c) => c.id === id))
    .filter(Boolean);
  const completed = active.filter((c) => progress(c, done) === 100).length;
  const avg = scores.length
    ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
    : 0;
  const today = new Intl.DateTimeFormat('en', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(new Date());
  return (
    <>
      <div className="welcome-banner">
        <div className="welcome-copy">
          <div className="eyebrow">
            <span className="eyebrow-dot" /> {today.toUpperCase()}
          </div>
          <h1>
            Good morning, {user?.name?.split(' ')[0] || 'Alex'} <span>✦</span>
          </h1>
          <p>Every expert was once a beginner. Keep showing up.</p>
          <Button to={active.length ? `/learn/${active[0].id}` : '/catalog'}>
            Continue learning <ArrowRight size={15} />
          </Button>
        </div>
        <div className="welcome-visual">
          <div className="welcome-glow" />
          <div className="welcome-book">✧</div>
          <span className="sparkle s1">✦</span>
          <span className="sparkle s2">✧</span>
          <span className="welcome-tag">YOUR NEXT CHAPTER ✦</span>
        </div>
      </div>
      <div className="stats-grid">
        {[
          ['Enrolled courses', active.length, BookOpen, 'blue-stat'],
          ['Completed courses', completed, Trophy, 'purple-stat'],
          [
            'Learning hours',
            `${(active.length * 2.4).toFixed(1)}h`,
            Clock3,
            'cyan-stat',
          ],
          ['Average quiz score', `${avg}%`, Target, 'pink-stat'],
        ].map(([label, val, I, cl]) => (
          <Card className="stat-card" key={label}>
            <span className={`stat-icon ${cl}`}>
              <I size={18} />
            </span>
            <span className="stat-label">{label}</span>
            <b className="stat-value">{val}</b>
            <span className="stat-foot">
              {label === 'Enrolled courses'
                ? 'Your learning path'
                : label === 'Average quiz score'
                  ? scores.length
                    ? 'Across your attempts'
                    : 'Take a quiz to begin'
                  : 'Keep your momentum going'}
            </span>
          </Card>
        ))}
      </div>
      <div className="dashboard-columns">
        <div className="main-column">
          <div className="content-title">
            <div>
              <h2>Pick up where you left off</h2>
              <p>Your next small step is waiting.</p>
            </div>
            <Link to="/learning" className="text-link">
              See all <ArrowRight size={14} />
            </Link>
          </div>
          {active.length ? (
            <div className="continue-list">
              {active.slice(0, 2).map((c) => (
                <ContinueCard c={c} key={c.id} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={BookOpen}
              title="Your learning journey starts here"
              text="Find a course that sparks your curiosity and start learning at your own pace."
              action="Explore courses"
              to="/catalog"
            />
          )}
          <Card className="activity-card">
            <div className="activity-heading">
              <div>
                <h3>Your learning rhythm</h3>
                <p>A little consistency goes a long way.</p>
              </div>
              <div className="activity-key">
                <i /> Learning time
              </div>
            </div>
            <div className="activity-chart">
              <div className="chart-y">
                <span>4h</span>
                <span>3h</span>
                <span>2h</span>
                <span>1h</span>
                <span>0h</span>
              </div>
              <div className="chart-main">
                <div className="chart-lines">
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
                <div className="chart-bars">
                  {[22, 40, 30, 62, 42, 76, 52].map((v, i) => (
                    <div className="chart-bar-wrap" key={i}>
                      <div
                        className={`chart-bar ${i === 5 ? 'today' : ''}`}
                        style={{ height: `${v}%` }}
                        title={`${Math.round(v / 20)} hours`}
                      />
                      <span>{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div className="side-column">
          <Card className="week-card">
            <div className="week-head">
              <span className="stat-icon purple-stat">
                <Zap size={17} />
              </span>
              <span className="week-pill">THIS WEEK</span>
            </div>
            <h3>
              Showing up is
              <br />
              the whole secret.
            </h3>
            <p>Keep a small promise to yourself today.</p>
            <div className="week-progress">
              <i style={{ width: '64%' }} />
            </div>
            <div className="week-foot">
              <span>Weekly goal</span>
              <b>
                3.2 <small>/ 5 hours</small>
              </b>
            </div>
            <div className="week-days">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                <span key={i} className={i < 4 ? 'day-done' : ''}>
                  {i < 4 ? '✓' : d}
                </span>
              ))}
            </div>
          </Card>
          <div className="content-title compact-title">
            <div>
              <h2>Picked for you</h2>
              <p>Good next steps based on your interests.</p>
            </div>
          </div>
          {courses
            .filter((c) => !enrolled.includes(c.id))
            .slice(0, 2)
            .map((c) => (
              <MiniCourse c={c} key={c.id} />
            ))}
          <Card className="quote-card">
            <div className="quote-mark">“</div>
            <p>
              The beautiful thing about learning is nobody can take it away from
              you.
            </p>
            <span>— B.B. King</span>
          </Card>
        </div>
      </div>
    </>
  );
}
