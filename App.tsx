import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import AuthPage from './pages/AuthPage';
import TeacherDashboard from './pages/TeacherDashboard';
import ProfilePage from './pages/ProfilePage';
import { Course, PageRoute } from './types';

function AppContent() {
  const { user, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const handleNavigate = (page: PageRoute) => {
    // Guard: auth pages require no login; protected pages require login
    if ((page === 'teacher-dashboard' || page === 'profile') && !user) {
      setCurrentPage('login');
      return;
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCourseSelect = (course: Course) => {
    setSelectedCourse(course);
  };

  // Reset to home if on a protected page after logout
  useEffect(() => {
    if (!user && (currentPage === 'teacher-dashboard' || currentPage === 'profile')) {
      setCurrentPage('home');
    }
  }, [user, currentPage]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-400">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  const showSidebar = user && (currentPage === 'teacher-dashboard' || currentPage === 'profile' || currentPage === 'courses');
  const showFooter = currentPage !== 'login' && currentPage !== 'register';

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        sidebarOpen={sidebarOpen}
      />

      <div className="flex flex-1">
        {showSidebar && (
          <Sidebar
            currentPage={currentPage}
            onNavigate={handleNavigate}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
        )}

        <main className="flex-1 min-w-0">
          {currentPage === 'home' && <HomePage onNavigate={handleNavigate} onCourseSelect={handleCourseSelect} />}
          {currentPage === 'courses' && <CoursesPage onNavigate={handleNavigate} onCourseSelect={handleCourseSelect} />}
          {currentPage === 'course-detail' && <CourseDetailPage course={selectedCourse} onNavigate={handleNavigate} />}
          {currentPage === 'login' && <AuthPage mode="login" onNavigate={handleNavigate} />}
          {currentPage === 'register' && <AuthPage mode="register" onNavigate={handleNavigate} />}
          {currentPage === 'teacher-dashboard' && <TeacherDashboard onNavigate={handleNavigate} />}
          {currentPage === 'profile' && <ProfilePage onNavigate={handleNavigate} />}
        </main>
      </div>

      {showFooter && <Footer onNavigate={handleNavigate} />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
