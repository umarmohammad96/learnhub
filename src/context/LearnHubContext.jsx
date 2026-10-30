import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check } from 'lucide-react';

const Store = createContext(null);
const read = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
};
export function Provider({ children }) {
  const [user, setUser] = useState(() => read('learnhub.user', null)),
    [enrolled, setEnrolled] = useState(() => read('learnhub.enrolled', [])),
    [done, setDone] = useState(() => read('learnhub.done', {})),
    [bookmarks, setBookmarks] = useState(() => read('learnhub.bookmarks', [])),
    [scores, setScores] = useState(() => read('learnhub.scores', [])),
    [toast, setToast] = useState('');
  useEffect(
    () => localStorage.setItem('learnhub.user', JSON.stringify(user)),
    [user],
  );
  useEffect(
    () => localStorage.setItem('learnhub.enrolled', JSON.stringify(enrolled)),
    [enrolled],
  );
  useEffect(
    () => localStorage.setItem('learnhub.done', JSON.stringify(done)),
    [done],
  );
  useEffect(
    () => localStorage.setItem('learnhub.bookmarks', JSON.stringify(bookmarks)),
    [bookmarks],
  );
  useEffect(
    () => localStorage.setItem('learnhub.scores', JSON.stringify(scores)),
    [scores],
  );
  const notify = (s) => {
    setToast(s);
    window.setTimeout(() => setToast(''), 2600);
  };
  const value = useMemo(
    () => ({
      user,
      setUser,
      enrolled,
      setEnrolled,
      done,
      setDone,
      bookmarks,
      setBookmarks,
      scores,
      setScores,
      notify,
    }),
    [user, enrolled, done, bookmarks, scores],
  );
  return (
    <Store.Provider value={value}>
      {children}
      <AnimatePresence>
        {toast && (
          <motion.div
            className="toast"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <Check size={16} />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </Store.Provider>
  );
}

export const useStore = () => useContext(Store);
