import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function Button({
  children,
  to,
  onClick,
  variant = 'primary',
  ...props
}) {
  return to ? (
    <Link className={`btn ${variant}`} to={to} {...props}>
      {children}
    </Link>
  ) : (
    <button className={`btn ${variant}`} onClick={onClick} {...props}>
      {children}
    </button>
  );
}

export function Card({ children, className = '', ...p }) {
  return (
    <div className={`glass-card ${className}`} {...p}>
      {children}
    </div>
  );
}

export function Heading({ eyebrow, title, sub, action }) {
  return (
    <div className="page-heading">
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <h1>{title}</h1>
        {sub && <p>{sub}</p>}
      </div>
      {action}
    </div>
  );
}

export function EmptyState({ icon: I, title, text, action, to }) {
  return (
    <Card className="empty-state">
      <span className="empty-icon">
        <I size={23} />
      </span>
      <h3>{title}</h3>
      <p>{text}</p>
      {action && (
        <Button to={to}>
          {action} <ArrowRight size={15} />
        </Button>
      )}
    </Card>
  );
}
