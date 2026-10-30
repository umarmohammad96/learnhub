import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Check,
  Github,
  Globe,
  Linkedin,
  Play,
  Sparkles,
} from 'lucide-react';
import { Button } from '../components/ui.jsx';
import { Card } from '../components/ui.jsx';
import { CourseCard } from '../components/CourseCard.jsx';
import { SOCIAL_LINKS } from '../config/contact.js';
import { courses } from '../data.js';

const socialIcons = {
  LinkedIn: Linkedin,
  GitHub: Github,
  Portfolio: Globe,
};

export function Landing() {
  return (
    <div className="landing">
      <nav className="landing-nav">
        <Link to="/" className="brand">
          <span className="brand-mark">
            <Sparkles size={18} />
          </span>
          learnhub<span className="brand-dot">.</span>
        </Link>
        <div>
          <a href="#features">Why LearnHub</a>
          <a href="#courses">Courses</a>
        </div>
        <div className="nav-ctas">
          <Button to="/login" variant="nav-ghost">
            Log in
          </Button>
          <Button to="/signup">
            Start learning <ArrowRight size={15} />
          </Button>
        </div>
      </nav>
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="eyebrow-dot" />
            YOUR NEXT CHAPTER STARTS HERE
          </div>
          <h1>
            Learn smarter.
            <br />
            <span>Grow faster.</span>
          </h1>
          <p>
            Build skills that move you forward. LearnHub makes room for your
            curiosity, your pace, and the future you’re creating.
          </p>
          <div className="hero-actions">
            <Button to="/catalog">
              Explore courses <ArrowRight size={16} />
            </Button>
            <Button to="/signup" variant="glass">
              Start learning <Play size={14} fill="currentColor" />
            </Button>
          </div>
          <div className="social-proof">
            <div className="avatar-stack">
              <i>J</i>
              <i>M</i>
              <i>A</i>
              <i>S</i>
            </div>
            <div>
              <b>Join 24,000+ curious minds</b>
              <small>
                <span className="stars">★★★★★</span> 4.9 learner rating
              </small>
            </div>
          </div>
        </div>
        <div className="hero-art">
          <div className="orb orb-one" />
          <div className="orb orb-two" />
          <div className="dashboard-preview glass-card">
            <div className="preview-top">
              <div>
                <small>MONDAY, MAY 20</small>
                <h3>
                  Good morning, Alex <span>✦</span>
                </h3>
              </div>
              <div className="preview-avatar">A</div>
            </div>
            <div className="preview-stats">
              <div>
                <span>Learning streak</span>
                <b>🔥 12 days</b>
              </div>
              <div>
                <span>Hours this week</span>
                <b>
                  06.5 <small>+18%</small>
                </b>
              </div>
            </div>
            <div className="preview-label">
              Continue learning <a>View all ↗</a>
            </div>
            <div className="preview-course">
              <div className="preview-course-art">⚛️</div>
              <div className="preview-course-info">
                <b>React.js for Beginners</b>
                <span>Lesson 08 · State & events</span>
                <div className="mini-progress">
                  <i />
                </div>
                <small>58% complete</small>
              </div>
              <button className="play-button">
                <Play size={15} fill="currentColor" />
              </button>
            </div>
            <div className="preview-bottom">
              <span>YOUR WEEKLY ACTIVITY</span>
              <div className="bars">
                {[34, 58, 42, 88, 64, 100, 46].map((n, i) => (
                  <i
                    key={i}
                    style={{ height: `${n}%` }}
                    className={i === 5 ? 'bar-active' : ''}
                  />
                ))}
              </div>
              <div className="days">
                <span>M</span>
                <span>T</span>
                <span>W</span>
                <span>T</span>
                <span>F</span>
                <span>S</span>
                <span>S</span>
              </div>
            </div>
          </div>
          <div className="float-note float-streak">
            <span>🔥</span>
            <div>
              <b>12 day streak</b>
              <small>You’re on fire!</small>
            </div>
          </div>
          <div className="float-note float-done">
            <div className="done-icon">
              <Check size={15} />
            </div>
            <div>
              <b>Lesson complete</b>
              <small>+ 25 XP earned</small>
            </div>
          </div>
          <div className="art-caption">A little progress, every day.</div>
        </div>
      </section>
      <div className="logo-strip">
        <span>LEARNERS AT TEAMS LIKE</span>
        <b>◈ vertex</b>
        <b>◉ moreland</b>
        <b>✳︎ northstar</b>
        <b>◒ goodwell</b>
        <b>◇ orbit</b>
      </div>
      <section className="section" id="features">
        <div className="section-heading">
          <div className="eyebrow">A BETTER WAY TO LEARN</div>
          <h2>
            Made for the way <span>you grow.</span>
          </h2>
          <p>Everything you need to turn “someday” into “I did it.”</p>
        </div>
        <div className="feature-grid">
          {[
            [
              '✦',
              'Curated for you',
              'Thoughtfully designed courses that focus on skills you can put to work.',
            ],
            [
              '◷',
              'Progress that feels good',
              'See your momentum build with clear milestones and a little celebration.',
            ],
            [
              '◎',
              'Practice as you go',
              'Interactive quizzes help new ideas stick and show you where to focus.',
            ],
            [
              '↗',
              'Your pace, your path',
              'Pick up where you left off. Your learning journey fits your life.',
            ],
          ].map((x, i) => (
            <Card key={x[1]} className="feature-card">
              <div className={`feature-icon icon-${i}`}>{x[0]}</div>
              <h3>{x[1]}</h3>
              <p>{x[2]}</p>
              <span className="feature-index">0{i + 1}</span>
            </Card>
          ))}
        </div>
      </section>
      <section className="section popular-section" id="courses">
        <div className="section-heading row-heading">
          <div>
            <div className="eyebrow">A GOOD PLACE TO START</div>
            <h2>
              Popular <span>right now.</span>
            </h2>
          </div>
          <Link to="/catalog" className="text-link">
            Browse all courses <ArrowRight size={15} />
          </Link>
        </div>
        <div className="course-grid landing-courses">
          {courses.slice(0, 3).map((c) => (
            <CourseCard key={c.id} c={c} />
          ))}
        </div>
      </section>
      <section className="journey">
        <div>
          <div className="eyebrow">YOUR LEARNING JOURNEY</div>
          <h2>
            Three steps.
            <br />
            <span>A whole new you.</span>
          </h2>
          <p>
            No complicated plans. Just a clear next step, whenever you’re ready.
          </p>
          <Button to="/signup">
            Find your next step <ArrowRight size={16} />
          </Button>
        </div>
        <div className="steps">
          {[
            [
              '01',
              'Find your spark',
              'Explore practical courses built around real skills.',
            ],
            [
              '02',
              'Make it yours',
              'Follow a clear path with lessons that fit your day.',
            ],
            [
              '03',
              'See how far you’ve come',
              'Practice, track your growth, and celebrate every win.',
            ],
          ].map((s) => (
            <div className="step" key={s[0]}>
              <span>{s[0]}</span>
              <div>
                <b>{s[1]}</b>
                <p>{s[2]}</p>
              </div>
              <ArrowRight size={18} />
            </div>
          ))}
        </div>
      </section>
      <footer className="landing-footer">
        <Link to="/" className="brand">
          <span className="brand-mark">
            <Sparkles size={18} />
          </span>
          learnhub<span className="brand-dot">.</span>
        </Link>
        <span>Make space for what’s next.</span>
        <nav className="social-links" aria-label="Developer links">
          {SOCIAL_LINKS.map(({ label, href }) => {
            const Icon = socialIcons[label];
            return (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                title={label}
              >
                <Icon size={17} />
              </a>
            );
          })}
        </nav>
        <span>© 2025 LearnHub</span>
      </footer>
    </div>
  );
}
