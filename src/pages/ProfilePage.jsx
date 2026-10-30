import { useState } from 'react';
import { Check, Settings, Trophy } from 'lucide-react';
import { Button } from '../components/ui.jsx';
import { Card } from '../components/ui.jsx';
import { Heading } from '../components/ui.jsx';
import { useStore } from '../context/LearnHubContext.jsx';
import { courses } from '../data.js';
import { progress } from '../utils/courseProgress.js';

export function Profile() {
  const { user, setUser, enrolled, done, scores, notify } = useStore();
  const [name, setName] = useState(user?.name || 'Alex Morgan'),
    [email, setEmail] = useState(user?.email || ''),
    [editing, setEditing] = useState(false);
  const list = enrolled
    .map((id) => courses.find((c) => c.id === id))
    .filter(Boolean);
  function save(e) {
    e.preventDefault();
    setUser({ ...user, name, email });
    setEditing(false);
    notify('Profile updated');
  }
  return (
    <>
      <Heading
        eyebrow="YOUR CORNER OF LEARNHUB"
        title="Profile & preferences"
        sub="A little about the learner behind the journey."
      />
      <div className="profile-layout">
        <div>
          <Card className="profile-card">
            <div className="profile-hero">
              <div className="profile-avatar">{(user?.name || 'A')[0]}</div>
              <div>
                <span>CURIOUS MIND SINCE 2025</span>
                <h2>{user?.name || 'Alex Morgan'}</h2>
                <p>{user?.email || 'alex@example.com'}</p>
              </div>
            </div>
            <div className="profile-stats">
              <div>
                <b>{enrolled.length}</b>
                <span>Courses joined</span>
              </div>
              <div>
                <b>{list.filter((c) => progress(c, done) === 100).length}</b>
                <span>Courses completed</span>
              </div>
              <div>
                <b>
                  {scores.length
                    ? Math.round(
                        scores.reduce((a, b) => a + b, 0) / scores.length,
                      ) + '%'
                    : '—'}
                </b>
                <span>Quiz average</span>
              </div>
            </div>
            <div className="profile-section-title">
              <h3>About you</h3>
              <button
                className="text-link"
                onClick={() => setEditing(!editing)}
              >
                {editing ? 'Cancel' : 'Edit profile'}
              </button>
            </div>
            {editing ? (
              <form className="profile-form" onSubmit={save}>
                <label>
                  Full name
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </label>
                <label>
                  Email address
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    required
                  />
                </label>
                <Button>
                  Save changes <Check size={15} />
                </Button>
              </form>
            ) : (
              <div className="profile-data">
                <div>
                  <span>Full name</span>
                  <b>{user?.name || 'Alex Morgan'}</b>
                </div>
                <div>
                  <span>Email address</span>
                  <b>{user?.email || 'alex@example.com'}</b>
                </div>
                <div>
                  <span>Learning preference</span>
                  <b>Small steps, steady progress</b>
                </div>
              </div>
            )}
          </Card>
        </div>
        <div className="profile-side">
          <Card className="preferences-card">
            <span className="stat-icon purple-stat">
              <Settings size={18} />
            </span>
            <h3>Learning preferences</h3>
            <p>
              Your account uses local browser storage for this demo. Information
              stays on this device.
            </p>
            <div className="preference-row">
              <span>
                <b>Weekly learning goal</b>
                <small>Keep a rhythm that works for you</small>
              </span>
              <select defaultValue="5 hours">
                <option>3 hours</option>
                <option>5 hours</option>
                <option>7 hours</option>
              </select>
            </div>
            <div className="preference-row">
              <span>
                <b>Learning reminders</b>
                <small>Gentle nudges to keep going</small>
              </span>
              <input type="checkbox" defaultChecked />
            </div>
          </Card>
          <Card className="profile-note">
            <Trophy size={20} />
            <b>Every step counts.</b>
            <p>Your progress is saved automatically as you learn.</p>
          </Card>
        </div>
      </div>
    </>
  );
}
