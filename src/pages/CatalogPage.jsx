import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { Heading } from '../components/ui.jsx';
import { EmptyState } from '../components/ui.jsx';
import { CourseCard } from '../components/CourseCard.jsx';
import { courses } from '../data.js';

export function Catalog() {
  const [query, setQuery] = useState(''),
    [category, setCategory] = useState('All topics'),
    [level, setLevel] = useState('All levels'),
    [sort, setSort] = useState('Popular');
  const cats = ['All topics', ...new Set(courses.map((c) => c.category))];
  const filtered = courses
    .filter(
      (c) =>
        (c.title + c.description + c.instructor)
          .toLowerCase()
          .includes(query.toLowerCase()) &&
        (category === 'All topics' || c.category === category) &&
        (level === 'All levels' || c.level === level),
    )
    .sort((a, b) =>
      sort === 'Duration'
        ? a.duration.localeCompare(b.duration)
        : b.rating - a.rating,
    );
  return (
    <>
      <Heading
        eyebrow="THE COURSE LIBRARY"
        title="Find your next thing."
        sub="Practical skills, thoughtful teachers, and a path that fits your life."
      />
      <div className="filter-bar">
        <label className="search-box">
          <Search size={17} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search courses, skills, instructors..."
          />
        </label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {cats.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <select value={level} onChange={(e) => setLevel(e.target.value)}>
          {['All levels', 'Beginner', 'Intermediate', 'Advanced'].map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option>Popular</option>
          <option>Duration</option>
        </select>
      </div>
      <div className="results-line">
        Showing <b>{filtered.length} courses</b>
        <span>Fresh ideas for your next chapter</span>
      </div>
      {filtered.length ? (
        <div className="course-grid catalog-grid">
          {filtered.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.035 }}
            >
              <CourseCard c={c} />
            </motion.div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Search}
          title="No courses found"
          text="Try a different search or clear some filters."
          action="Browse all courses"
          to="/catalog"
        />
      )}
    </>
  );
}
