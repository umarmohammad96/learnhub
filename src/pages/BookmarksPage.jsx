import { Link } from 'react-router-dom';
import { Bookmark, X } from 'lucide-react';
import { Card } from '../components/ui.jsx';
import { Heading } from '../components/ui.jsx';
import { EmptyState } from '../components/ui.jsx';
import { useStore } from '../context/LearnHubContext.jsx';
import { courses } from '../data.js';

export function Bookmarks() {
  const { bookmarks, setBookmarks, notify } = useStore();
  const saved = bookmarks
    .map((k) => {
      if (k.startsWith('course:'))
        return {
          type: 'course',
          c: courses.find((c) => c.id === k.slice(7)),
          key: k,
        };
      const [, id, title] = k.split(':');
      return {
        type: 'lesson',
        c: courses.find((c) => c.id === id),
        title,
        key: k,
      };
    })
    .filter((x) => x.c);
  return (
    <>
      <Heading
        eyebrow="SAVED FOR LATER"
        title="Your bookmarks"
        sub="Good ideas worth coming back to."
      />
      {saved.length ? (
        <div className="bookmark-list">
          {saved.map((x) => (
            <Card className="bookmark-card" key={x.key}>
              <div className={`mini-art art-${x.c.color}`}>{x.c.icon}</div>
              <div>
                <span className="bookmark-type">
                  {x.type === 'course' ? 'COURSE' : 'LESSON'}
                </span>
                <Link
                  to={
                    x.type === 'course'
                      ? `/course/${x.c.id}`
                      : `/learn/${x.c.id}`
                  }
                >
                  <h3>{x.type === 'course' ? x.c.title : x.title}</h3>
                </Link>
                <p>
                  {x.c.title} · {x.c.instructor}
                </p>
              </div>
              <button
                className="icon-btn"
                onClick={() => {
                  setBookmarks(bookmarks.filter((k) => k !== x.key));
                  notify('Bookmark removed');
                }}
                aria-label="Remove bookmark"
              >
                <X size={17} />
              </button>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Bookmark}
          title="Nothing saved yet"
          text="Save a course or lesson to keep it close for later."
          action="Browse courses"
          to="/catalog"
        />
      )}
    </>
  );
}
