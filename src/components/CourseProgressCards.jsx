import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { Button } from './ui.jsx';
import { Card } from './ui.jsx';
import { useStore } from '../context/LearnHubContext.jsx';
import { allLessons, progress } from '../utils/courseProgress.js';

export function ContinueCard({ c }) {
  const { done } = useStore(),
    pct = progress(c, done);
  return (
    <Card className="continue-card">
      <div className={`continue-art art-${c.color}`}>{c.icon}</div>
      <div className="continue-info">
        <div className="course-rating">
          <span>{c.category}</span>
          <span>{pct}% complete</span>
        </div>
        <h3>{c.title}</h3>
        <p>
          Next up ·{' '}
          {allLessons(c)[(done[c.id] || []).length % allLessons(c).length]}
        </p>
        <div className="progress-track">
          <i style={{ width: `${pct}%` }} />
        </div>
        <div className="continue-foot">
          <span>
            {(done[c.id] || []).length} of {c.lessons} lessons
          </span>
          <Button to={`/learn/${c.id}`} variant="soft">
            Continue <ArrowRight size={14} />
          </Button>
        </div>
      </div>
    </Card>
  );
}

export function MiniCourse({ c }) {
  return (
    <Link to={`/course/${c.id}`} className="mini-course">
      <div className={`mini-art art-${c.color}`}>{c.icon}</div>
      <div>
        <b>{c.title}</b>
        <span>
          <Star size={12} fill="currentColor" /> {c.rating} · {c.duration}
        </span>
      </div>
      <ArrowRight size={16} />
    </Link>
  );
}
