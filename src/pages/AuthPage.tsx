import { useState } from 'react';
import { Mail, Lock, User, GraduationCap, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { PageRoute } from '../types';

interface AuthPageProps {
  mode: 'login' | 'register';
  onNavigate: (page: PageRoute) => void;
}

export default function AuthPage({ mode, onNavigate }: AuthPageProps) {
  const { signIn, signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isLogin = mode === 'login';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (isLogin) {
      const { error } = await signIn(email, password);
      if (error) setError(error);
      else onNavigate('home');
    } else {
      const { error } = await signUp(email, password, fullName);
      if (error) setError(error);
      else {
        setError(null);
        onNavigate('login');
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-primary-50 via-white to-primary-50">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 shadow-lg shadow-primary-600/20 mb-4">
            <GraduationCap className="text-white" size={32} />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">
            {isLogin ? 'مرحباً بعودتك' : 'إنشاء حساب جديد'}
          </h1>
          <p className="text-gray-500 mt-2">
            {isLogin ? 'سجل دخولك للمتابعة إلى منصة ZClassroom' : 'انضم إلى ZClassroom وابدأ رحلتك التعليمية'}
          </p>
        </div>

        {/* Form */}
        <div className="card p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">الاسم الكامل</label>
                <div className="relative">
                  <User className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="أدخل اسمك الكامل"
                    className="input-field pr-12"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">البريد الإلكتروني</label>
              <div className="relative">
                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  className="input-field pr-12"
                  dir="ltr"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">كلمة المرور</label>
              <div className="relative">
                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-field pr-12"
                  dir="ltr"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 rounded-xl bg-error-50 border border-error-100 px-4 py-3 text-sm text-error-700">
                <AlertCircle size={18} className="shrink-0" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'جاري المعالجة...' : isLogin ? 'تسجيل الدخول' : 'إنشاء الحساب'}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          {/* Switch */}
          <div className="text-center mt-6 text-sm text-gray-500">
            {isLogin ? (
              <>
                ليس لديك حساب؟{' '}
                <button onClick={() => onNavigate('register')} className="text-primary-600 font-medium hover:underline">
                  أنشئ حساباً جديداً
                </button>
              </>
            ) : (
              <>
                لديك حساب بالفعل؟{' '}
                <button onClick={() => onNavigate('login')} className="text-primary-600 font-medium hover:underline">
                  سجل دخولك
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
