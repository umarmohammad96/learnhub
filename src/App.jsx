import { AnimatePresence } from 'framer-motion';
import { Route, Routes } from 'react-router-dom';
import { Provider } from './context/LearnHubContext.jsx';
import { Layout as AppLayout } from './components/AppLayout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import { EmptyState } from './components/ui.jsx';
import { Auth as AuthPage } from './pages/AuthPage.jsx';
import { Bookmarks as BookmarksPage } from './pages/BookmarksPage.jsx';
import { Catalog as CatalogPage } from './pages/CatalogPage.jsx';
import { Details as CourseDetailsPage } from './pages/CourseDetailsPage.jsx';
import { Dashboard as DashboardPage } from './pages/DashboardPage.jsx';
import { Landing as LandingPage } from './pages/LandingPage.jsx';
import { Learning as LearningPage } from './pages/LearningPage.jsx';
import { Player as PlayerPage } from './pages/PlayerPage.jsx';
import { Profile as ProfilePage } from './pages/ProfilePage.jsx';
import { Quiz as QuizPage } from './pages/QuizPage.jsx';
import { Search } from 'lucide-react';

function WorkspacePage({ children }) {
  return <AppLayout>{children}</AppLayout>;
}

function App() {
  return (
    <Provider>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/signup" element={<AuthPage signup />} />
          <Route element={<ProtectedRoute />}>
            <Route
              path="/app"
              element={
                <WorkspacePage>
                  <DashboardPage />
                </WorkspacePage>
              }
            />
            <Route
              path="/catalog"
              element={
                <WorkspacePage>
                  <CatalogPage />
                </WorkspacePage>
              }
            />
            <Route
              path="/course/:id"
              element={
                <WorkspacePage>
                  <CourseDetailsPage />
                </WorkspacePage>
              }
            />
            <Route
              path="/learning"
              element={
                <WorkspacePage>
                  <LearningPage />
                </WorkspacePage>
              }
            />
            <Route path="/learn/:id" element={<PlayerPage />} />
            <Route
              path="/quiz/:id"
              element={
                <WorkspacePage>
                  <QuizPage />
                </WorkspacePage>
              }
            />
            <Route
              path="/bookmarks"
              element={
                <WorkspacePage>
                  <BookmarksPage />
                </WorkspacePage>
              }
            />
            <Route
              path="/profile"
              element={
                <WorkspacePage>
                  <ProfilePage />
                </WorkspacePage>
              }
            />
            <Route
              path="*"
              element={
                <WorkspacePage>
                  <EmptyState
                    icon={Search}
                    title="Page not found"
                    text="Let's get you back to learning."
                    action="Go to dashboard"
                    to="/app"
                  />
                </WorkspacePage>
              }
            />
          </Route>
        </Routes>
      </AnimatePresence>
    </Provider>
  );
}

export default App;
