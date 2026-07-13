import { useState } from 'react';
import { User, Mail, Shield, Save } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { PageRoute } from '../types';

interface ProfilePageProps {
  onNavigate: (page: PageRoute) => void;
}

export default function ProfilePage({ onNavigate }: ProfilePageProps) {
  const { user, profile, refreshProfile } = useAuth();
  const [fullName, setFullName] = useState(profile?.full_name ?? '');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    const { error } = await supabase
      .from('profiles')
      .update({ full_name: fullName })
      .eq('id', user?.id);
    setSaving(false);
    if (!error) {
      setSaved(true);
      refreshProfile();
      setTimeout(() => setSaved(false), 3000);
    }
  };

  if (!user || !profile) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-500 mb-4">يرجى تسجيل الدخول لعرض الملف الشخصي</p>
        <button onClick={() => onNavigate('login')} className="btn-primary">تسجيل الدخول</button>
      </div>
    );
  }

  const isTeacher = profile.role === 'teacher';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8">الملف الشخصي</h1>

      {/* Profile card */}
      <div className="card p-6 mb-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-2xl font-bold">
            {profile.full_name?.[0] ?? user.email?.[0]?.toUpperCase() ?? 'U'}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">{profile.full_name ?? 'مستخدم'}</h2>
            <p className="text-gray-500">{user.email}</p>
            <div className="flex gap-2 mt-2">
              <span className={`px-3 py-0.5 rounded-full text-xs font-medium ${isTeacher ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-600'}`}>
                {isTeacher ? 'معلم' : 'طالب'}
              </span>
              {profile.is_admin && (
                <span className="px-3 py-0.5 rounded-full text-xs font-medium bg-accent-100 text-accent-700">
                  مدير
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Info grid */}
        <div className="grid sm:grid-cols-2 gap-4 pt-6 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
              <Mail className="text-gray-400" size={18} />
            </div>
            <div>
              <p className="text-xs text-gray-400">البريد الإلكتروني</p>
              <p className="text-sm font-medium text-gray-700" dir="ltr">{user.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
              <Shield className="text-gray-400" size={18} />
            </div>
            <div>
              <p className="text-xs text-gray-400">الدور</p>
              <p className="text-sm font-medium text-gray-700">{isTeacher ? 'معلم' : 'طالب'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Edit form */}
      <div className="card p-6">
        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <User size={20} className="text-primary-600" />
          تعديل البيانات
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">الاسم الكامل</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="input-field"
              placeholder="أدخل اسمك الكامل"
            />
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="btn-primary disabled:opacity-60"
          >
            <Save size={18} />
            {saving ? 'جاري الحفظ...' : 'حفظ التغييرات'}
          </button>
          {saved && (
            <p className="text-sm text-success-600">تم حفظ التغييرات بنجاح</p>
          )}
        </div>
      </div>
    </div>
  );
}
