import { useState } from 'react';
import { GraduationCap, Menu, X, Home, BookOpen, LayoutDashboard, LogIn, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { PageRoute } from '../types';

interface NavbarProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
}

export default function Navbar({ currentPage, onNavigate, onToggleSidebar, sidebarOpen }: NavbarProps) {
  const { user, profile, signOut } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const isTeacher = profile?.role === 'teacher';

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Right side (RTL = logo) */}
          <div className="flex items-center gap-3">
            {user && (
              <button
                onClick={onToggleSidebar}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
                aria-label="القائمة"
              >
                {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            )}
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-md shadow-primary-600/20 group-hover:scale-105 transition-transform">
                <GraduationCap className="text-white" size={24} />
              </div>
              <span className="text-xl font-bold text-gray-800 font-heading">
                Z<span className="text-primary-600">Classroom</span>
              </span>
            </button>
          </div>

          {/* Center nav links */}
          <nav className="hidden md:flex items-center gap-1">
            <NavLink active={currentPage === 'home'} onClick={() => onNavigate('home')} icon={<Home size={18} />}>
              الرئيسية
            </NavLink>
            <NavLink active={currentPage === 'courses'} onClick={() => onNavigate('courses')} icon={<BookOpen size={18} />}>
              الكورسات
            </NavLink>
            {isTeacher && (
              <NavLink active={currentPage === 'teacher-dashboard'} onClick={() => onNavigate('teacher-dashboard')} icon={<LayoutDashboard size={18} />}>
                لوحة تحكم المعلم
              </NavLink>
            )}
          </nav>

          {/* Left side (RTL = auth) */}
          <div className="flex items-center gap-2">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 rounded-xl px-3 py-2 hover:bg-gray-100 transition-colors"
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-semibold text-sm">
                    {profile?.full_name?.[0] ?? user.email?.[0]?.toUpperCase() ?? 'U'}
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-gray-700 max-w-[120px] truncate">
                    {profile?.full_name ?? user.email}
                  </span>
                </button>
                {userMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                    <div className="absolute left-0 mt-2 w-56 rounded-2xl bg-white shadow-xl border border-gray-100 py-2 z-50 animate-scale-in">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-800 truncate">{profile?.full_name ?? 'مستخدم'}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        {isTeacher && (
                          <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-primary-100 text-primary-700 text-xs font-medium">
                            {profile?.is_admin ? 'مدير' : 'معلم'}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => { onNavigate('profile'); setUserMenuOpen(false); }}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <User size={16} /> الملف الشخصي
                      </button>
                      {isTeacher && (
                        <button
                          onClick={() => { onNavigate('teacher-dashboard'); setUserMenuOpen(false); }}
                          className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <LayoutDashboard size={16} /> لوحة التحكم
                        </button>
                      )}
                      <button
                        onClick={() => { signOut(); setUserMenuOpen(false); onNavigate('home'); }}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-error-600 hover:bg-error-50 transition-colors"
                      >
                        <LogOut size={16} /> تسجيل الخروج
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <button onClick={() => onNavigate('login')} className="btn-primary text-sm">
                <LogIn size={18} />
                تسجيل الدخول
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

function NavLink({ active, onClick, icon, children }: { active: boolean; onClick: () => void; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
        active
          ? 'bg-primary-50 text-primary-700'
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
      }`}
    >
      {icon}
      {children}
    </button>
  );
}
