import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, CircleHelp, Sparkles } from 'lucide-react';
import { Card } from '../components/ui.jsx';
import { useStore } from '../context/LearnHubContext.jsx';

export function Auth({ signup = false }) {
  const { setUser, notify } = useStore(),
    nav = useNavigate(),
    location = useLocation();
  const [name, setName] = useState(''),
    [email, setEmail] = useState(''),
    [pass, setPass] = useState(''),
    [show, setShow] = useState(false),
    [error, setError] = useState('');
  function submit(e) {
    e.preventDefault();
    if (!email.includes('@')) return setError('Enter a valid email address.');
    if (pass.length < 6)
      return setError('Use at least 6 characters for your password.');
    const display = name.trim() || email.split('@')[0];
    setUser({ name: display, email });
    notify(signup ? 'Your learning journey starts now!' : 'Welcome back!');
    const destination = location.state?.from;
    nav(
      destination
        ? `${destination.pathname}${destination.search}${destination.hash}`
        : '/app',
      { replace: true },
    );
  }
  return (
    <div className="auth-page">
      <div className="auth-glow" />
      <Link to="/" className="brand auth-brand">
        <span className="brand-mark">
          <Sparkles size={18} />
        </span>
        learnhub<span className="brand-dot">.</span>
      </Link>
      <Card className="auth-card">
        <div className="auth-icon">
          <Sparkles size={20} />
        </div>
        <div className="eyebrow">
          {signup ? 'A FRESH START' : 'GOOD TO HAVE YOU BACK'}
        </div>
        <h1>{signup ? 'Create your account' : 'Welcome back.'}</h1>
        <p>
          {signup
            ? 'Your next big thing is closer than you think.'
            : 'Pick up where your curiosity left off.'}
        </p>
        <form onSubmit={submit}>
          {signup && (
            <label>
              Full name
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Morgan"
                required
              />
            </label>
          )}
          <label>
            Email address
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </label>
          <label>
            Password
            <div className="password-wrap">
              <input
                type={show ? 'text' : 'password'}
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder="At least 6 characters"
                minLength={6}
                required
              />
              <button type="button" onClick={() => setShow(!show)}>
                {show ? 'Hide' : 'Show'}
              </button>
            </div>
          </label>
          {error && <div className="form-error">{error}</div>}
          <button className="btn primary auth-submit">
            {signup ? 'Create account' : 'Sign in'} <ArrowRight size={16} />
          </button>
        </form>
        <div className="auth-switch">
          {signup ? 'Already have an account?' : 'New to LearnHub?'}{' '}
          <Link to={signup ? '/login' : '/signup'}>
            {signup ? 'Log in' : 'Create an account'}
          </Link>
        </div>
        <div className="demo-note">
          <CircleHelp size={14} /> Demo account only. Your data stays in this
          browser.
        </div>
      </Card>
      <div className="auth-foot">Thoughtfully made for curious minds.</div>
    </div>
  );
}
