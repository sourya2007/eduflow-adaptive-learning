/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import { ThemeProvider } from './components/ThemeProvider';
import { ToastProvider } from './components/ToastProvider';
import { GridOverlay } from './components/GridOverlay';
import { AuthProvider, useAuth } from './context/AuthContext';
import Welcome from './components/Welcome';
import LearningStyle from './components/LearningStyle';
import StudentDashboard from './components/StudentDashboard';
import CourseList from './components/CourseList';
import CourseDetails from './components/CourseDetails';
import Quiz from './components/Quiz';
import InstantFeedback from './components/InstantFeedback';
import TeacherDashboard from './components/TeacherDashboard';
import EditProfile from './components/EditProfile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import GetStarted from './pages/GetStarted';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" /></div>;
  if (!user) return <Navigate to="/signin" replace />;
  return <>{children}</>;
}

function KeyboardShortcuts() {
  const navigate = useNavigate();
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.altKey && (e.key === 't' || e.key === 'T')) {
        navigate('/teacher');
      } else if (e.altKey && (e.key === 's' || e.key === 'S')) {
        navigate('/student');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);
  return null;
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <ToastProvider>
        <ErrorBoundary>
          <AuthProvider>
            <KeyboardShortcuts />
            <GridOverlay />
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/get-started" element={<GetStarted />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/onboarding" element={<ProtectedRoute><LearningStyle /></ProtectedRoute>} />
              <Route path="/student" element={<ProtectedRoute><StudentDashboard /></ProtectedRoute>} />
              <Route path="/courses" element={<ProtectedRoute><CourseList /></ProtectedRoute>} />
              <Route path="/courses/:id" element={<ProtectedRoute><CourseDetails /></ProtectedRoute>} />
              <Route path="/quiz/:id" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
              <Route path="/quiz/result" element={<ProtectedRoute><InstantFeedback /></ProtectedRoute>} />
              <Route path="/teacher" element={<ProtectedRoute><TeacherDashboard /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
            </Routes>
          </AuthProvider>
        </ErrorBoundary>
      </ToastProvider>
    </ThemeProvider>
  );
}
