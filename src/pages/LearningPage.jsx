import { useState } from 'react';
import { BookOpen } from 'lucide-react';
import { Heading } from '../components/ui.jsx';
import { EmptyState } from '../components/ui.jsx';
import { ContinueCard } from '../components/CourseProgressCards.jsx';
import { useStore } from '../context/LearnHubContext.jsx';
import { courses } from '../data.js';
import { progress } from '../utils/courseProgress.js';

export function Learning() {
  const { enrolled, done } = useStore();
  const [filter, setFilter] = useState('All courses');
  const list = enrolled
    .map((id) => courses.find((c) => c.id === id))
    .filter(Boolean)
    .filter(
      (c) =>
        filter === 'All courses' ||
        (filter === 'In progress'
          ? progress(c, done) < 100
          : progress(c, done) === 100),
    );
  return (
    <>
      <Heading
        eyebrow="YOUR LEARNING SPACE"
        title="My learning"
        sub="All your courses, progress, and next steps in one place."
      />
      <div className="tabs">
        {['All courses', 'In progress', 'Completed'].map((x) => (
          <button
            key={x}
            onClick={() => setFilter(x)}
            className={filter === x ? 'selected' : ''}
          >
            {x}
            {x === 'All courses' && <span>{enrolled.length}</span>}
          </button>
        ))}
      </div>
      {list.length ? (
        <div className="learning-list">
          {list.map((c) => (
            <ContinueCard key={c.id} c={c} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={BookOpen}
          title={
            filter === 'All courses'
              ? 'Make this space yours'
              : 'Nothing here just yet'
          }
          text={
            filter === 'All courses'
              ? 'Your courses will live here. Find something you’re excited to learn.'
              : 'Keep going. Your next milestone is within reach.'
          }
          action="Explore courses"
          to="/catalog"
        />
      )}
    </>
  );
}
