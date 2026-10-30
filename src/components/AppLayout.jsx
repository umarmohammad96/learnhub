import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  Bookmark,
  BookOpen,
  Compass,
  LayoutDashboard,
  LogOut,
  Menu,
  Sparkles,
  UserRound,
  X,
} from 'lucide-react';
import { useStore } from '../context/LearnHubContext.jsx';
import HelpCenter from './HelpCenter.jsx';

export function Layout({ children }) {
  const { user, setUser, enrolled } = useStore();
  const [open, setOpen] = useState(false);
  const nav = [
    ['Overview', '/app', LayoutDashboard],
    ['Discover', '/catalog', Compass],
    ['My learning', '/learning', BookOpen],
    ['Bookmarks', '/bookmarks', Bookmark],
  ];
  return (
    <div className="app-shell">
      <aside className={`sidebar ${open ? 'show' : ''}`}>
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark">
            <Sparkles size={19} />
          </span>
          learnhub<span className="brand-dot">.</span>
        </Link>
        <div className="side-label">WORKSPACE</div>
        <nav>
          {nav.map(([n, to, I]) => (
            <NavLink
              end={to === '/app'}
              to={to}
              key={to}
              className={({ isActive }) =>
                `side-link ${isActive ? 'active' : ''}`
              }
              onClick={() => setOpen(false)}
            >
              <I size={18} />
              {n}
              {n === 'My learning' && (
                <span className="side-count">{enrolled.length}</span>
              )}
            </NavLink>
          ))}
        </nav>
        <div className="side-label library-label">YOUR ACCOUNT</div>
        <NavLink
          to="/profile"
          className={({ isActive }) => `side-link ${isActive ? 'active' : ''}`}
          onClick={() => setOpen(false)}
        >
          <UserRound size={18} />
          Profile
        </NavLink>
        <div className="sidebar-user">
          <div className="avatar">{user?.name?.[0] || 'A'}</div>
          <div className="user-meta">
            <b>{user?.name || 'Alex Morgan'}</b>
            <span>Free learner</span>
          </div>
          <button
            className="icon-btn"
            aria-label="Log out"
            onClick={() => {
              setUser(null);
              localStorage.removeItem('learnhub.user');
            }}
          >
            <LogOut size={17} />
          </button>
        </div>
      </aside>
      <main className="main-area">
        <header className="topbar">
          <button
            className="icon-btn mobile-menu"
            onClick={() => setOpen(!open)}
            aria-label="Open menu"
            aria-expanded={open}
          >
            {open ? <X /> : <Menu />}
          </button>
          <div className="crumb">
            LearnHub <span>/</span> <b>Workspace</b>
          </div>
          <div className="top-actions">
            <HelpCenter />
            <div className="top-avatar">{user?.name?.[0] || 'A'}</div>
          </div>
        </header>
        <div className="page-wrap">{children}</div>
      </main>
    </div>
  );
}
