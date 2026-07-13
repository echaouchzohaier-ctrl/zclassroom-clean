import { Home, BookOpen, LayoutDashboard, User, LogOut, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { PageRoute } from '../types';

interface SidebarProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ currentPage, onNavigate, isOpen, onClose }: SidebarProps) {
  const { user, profile, signOut } = useAuth();
  if (!user) return null;
  const isTeacher = profile?.role === 'teacher';

  const navItems = [
    { id: 'home' as PageRoute, label: 'الرئيسية', icon: Home },
    { id: 'courses' as PageRoute, label: 'الكورسات', icon: BookOpen },
    { id: 'profile' as PageRoute, label: 'الملف الشخصي', icon: User },
  ];

  if (isTeacher) {
    navItems.splice(2, 0, { id: 'teacher-dashboard' as PageRoute, label: 'لوحة تحكم المعلم', icon: LayoutDashboard });
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-16 bottom-0 right-0 z-30 w-72 bg-white border-l border-gray-100 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:top-0 lg:h-[calc(100vh-4rem)] lg:z-0 ${
          isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile close */}
          <div className="flex items-center justify-between p-4 lg:hidden">
            <span className="font-bold text-gray-800">القائمة</span>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100">
              <X size={20} />
            </button>
          </div>

          {/* User card */}
          <div className="p-4 m-4 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 text-white">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-lg font-bold">
                {profile?.full_name?.[0] ?? user.email?.[0]?.toUpperCase() ?? 'U'}
              </div>
              <div className="min-w-0">
                <p className="font-semibold truncate">{profile?.full_name ?? 'مستخدم'}</p>
                <p className="text-sm text-white/70 truncate">{user.email}</p>
              </div>
            </div>
            {isTeacher && (
              <div className="mt-3 flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-white/20 text-xs font-medium">
                  {profile?.is_admin ? 'مدير النظام' : 'معلم'}
                </span>
              </div>
            )}
          </div>

          {/* Nav links */}
          <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => { onNavigate(item.id); onClose(); }}
                  className={`flex items-center gap-3 w-full rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                    active
                      ? 'bg-primary-50 text-primary-700 border-r-4 border-primary-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                  }`}
                >
                  <Icon size={20} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-100">
            <button
              onClick={() => { signOut(); onClose(); onNavigate('home'); }}
              className="flex items-center gap-3 w-full rounded-xl px-4 py-3 text-sm font-medium text-error-600 hover:bg-error-50 transition-colors"
            >
              <LogOut size={20} />
              تسجيل الخروج
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
