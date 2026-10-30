import { Link } from 'react-router-dom';
import { Bookmark, BookOpen, Clock3, Star } from 'lucide-react';
import { Card } from './ui.jsx';
import { useStore } from '../context/LearnHubContext.jsx';

export function CourseCard({ c }) {
  const { bookmarks, setBookmarks, notify } = useStore();
  const marked = bookmarks.includes(`course:${c.id}`);
  return (
    <Card className="course-card">
      <Link to={`/course/${c.id}`} className={`course-art art-${c.color}`}>
        <span className="art-symbol">{c.icon}</span>
        <span className="art-sheen" />
        <span className="category-chip">{c.category}</span>
      </Link>
      <div className="course-body">
        <div className="course-rating">
          <span>
            <Star size={13} fill="currentColor" /> {c.rating}
          </span>
          <span>{c.level}</span>
        </div>
        <Link to={`/course/${c.id}`}>
          <h3>{c.title}</h3>
        </Link>
        <p>{c.description}</p>
        <div className="course-meta">
          <span>
            <BookOpen size={14} />
            {c.lessons} lessons
          </span>
          <span>
            <Clock3 size={14} />
            {c.duration}
          </span>
        </div>
        <div className="course-footer">
          <div className="instructor-avatar">
            {c.instructor
              .split(' ')
              .map((w) => w[0])
              .join('')}
          </div>
          <span>
            with <b>{c.instructor}</b>
          </span>
          <button
            className={`bookmark-btn ${marked ? 'marked' : ''}`}
            onClick={() => {
              setBookmarks(
                marked
                  ? bookmarks.filter((x) => x !== `course:${c.id}`)
                  : [...bookmarks, `course:${c.id}`],
              );
              notify(marked ? 'Bookmark removed' : 'Course saved to bookmarks');
            }}
            aria-label="Bookmark course"
          >
            <Bookmark size={16} fill={marked ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>
    </Card>
  );
}
