import { useRef, useState } from 'react';
import { CircleHelp, Mail, Send, X } from 'lucide-react';
import { DEVELOPER_EMAIL } from '../config/contact.js';

export default function HelpCenter() {
  const dialogRef = useRef(null);
  const [subject, setSubject] = useState('');
  const [correction, setCorrection] = useState('');

  function sendCorrection(event) {
    event.preventDefault();

    const body = [correction.trim(), '', `Page: ${window.location.href}`].join(
      '\n',
    );
    const mailto = new URL(`mailto:${DEVELOPER_EMAIL}`);
    mailto.searchParams.set(
      'subject',
      `LearnHub correction: ${subject.trim() || 'Website feedback'}`,
    );
    mailto.searchParams.set('body', body);
    window.location.href = mailto.toString();
    dialogRef.current?.close();
    setSubject('');
    setCorrection('');
  }

  return (
    <>
      <button
        className="top-help"
        type="button"
        onClick={() => dialogRef.current?.showModal()}
      >
        <CircleHelp size={16} /> Help & feedback
      </button>
      <dialog
        className="help-dialog"
        ref={dialogRef}
        onClick={(event) => {
          if (event.target === dialogRef.current) {
            dialogRef.current.close();
          }
        }}
      >
        <div className="help-dialog-heading">
          <div>
            <div className="eyebrow">HERE TO HELP</div>
            <h2>Contact the developer</h2>
          </div>
          <button
            className="icon-btn"
            type="button"
            aria-label="Close help and feedback"
            onClick={() => dialogRef.current?.close()}
          >
            <X size={18} />
          </button>
        </div>
        <p className="help-dialog-intro">
          Have a question or spotted something that needs correcting?
        </p>
        <a className="developer-email" href={`mailto:${DEVELOPER_EMAIL}`}>
          <Mail size={16} />
          {DEVELOPER_EMAIL}
        </a>
        <form className="correction-form" onSubmit={sendCorrection}>
          <label>
            Subject
            <input
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              placeholder="What should I take a look at?"
              required
            />
          </label>
          <label>
            Correction or feedback
            <textarea
              value={correction}
              onChange={(event) => setCorrection(event.target.value)}
              placeholder="Describe what needs correcting..."
              rows={4}
              required
            />
          </label>
          <button className="btn primary" type="submit">
            Open email draft <Send size={15} />
          </button>
          <small>
            This opens your email app with the message addressed to the
            developer. Nothing is sent automatically.
          </small>
        </form>
      </dialog>
    </>
  );
}
