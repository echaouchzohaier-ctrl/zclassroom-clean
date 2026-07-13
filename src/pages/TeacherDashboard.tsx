import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, BookOpen, DollarSign, X, Save, AlertCircle, Users } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { Course, CourseInput, PageRoute } from '../types';

interface TeacherDashboardProps {
  onNavigate: (page: PageRoute) => void;
}

export default function TeacherDashboard({ onNavigate }: TeacherDashboardProps) {
  const { profile } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const isTeacher = profile?.role === 'teacher';

  const fetchCourses = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) setCourses(data as Course[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا الكورس؟')) return;
    const { error } = await supabase.from('courses').delete().eq('id', id);
    if (error) setError('فشل حذف الكورس: ' + error.message);
    else {
      setSuccess('تم حذف الكورس بنجاح');
      fetchCourses();
    }
  };

  const openAddForm = () => {
    setEditingCourse(null);
    setShowForm(true);
    setError(null);
    setSuccess(null);
  };

  const openEditForm = (course: Course) => {
    setEditingCourse(course);
    setShowForm(true);
    setError(null);
    setSuccess(null);
  };

  if (!isTeacher) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <AlertCircle size={48} className="mx-auto mb-4 text-error-300" />
        <h2 className="text-xl font-bold text-gray-800 mb-2">غير مصرح بالوصول</h2>
        <p className="text-gray-500 mb-4">هذه الصفحة متاحة للمعلمين فقط</p>
        <button onClick={() => onNavigate('home')} className="btn-primary">
          العودة للرئيسية
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-2">
            <BookOpen className="text-primary-600" size={28} />
            لوحة تحكم المعلم
          </h1>
          <p className="text-gray-500 mt-1">إدارة كورساتك التعليمية</p>
        </div>
        <button onClick={openAddForm} className="btn-primary">
          <Plus size={20} />
          إضافة كورس جديد
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="card p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center">
            <BookOpen className="text-primary-600" size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-400">إجمالي الكورسات</p>
            <p className="text-2xl font-bold text-gray-800">{courses.length}</p>
          </div>
        </div>
        <div className="card p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-success-100 flex items-center justify-center">
            <DollarSign className="text-success-600" size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-400">إجمالي القيمة</p>
            <p className="text-2xl font-bold text-gray-800">
              {courses.reduce((sum, c) => sum + Number(c.price), 0)} ر.س
            </p>
          </div>
        </div>
        <div className="card p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-accent-100 flex items-center justify-center">
            <Users className="text-accent-600" size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-400">إجمالي الطلاب</p>
            <p className="text-2xl font-bold text-gray-800">{courses.length * 1200}</p>
          </div>
        </div>
      </div>

      {/* Alerts */}
      {error && (
        <div className="flex items-center gap-2 rounded-xl bg-error-50 border border-error-100 px-4 py-3 text-sm text-error-700 mb-4">
          <AlertCircle size={18} className="shrink-0" />
          {error}
        </div>
      )}
      {success && (
        <div className="flex items-center gap-2 rounded-xl bg-success-50 border border-success-100 px-4 py-3 text-sm text-success-700 mb-4">
          <Save size={18} className="shrink-0" />
          {success}
        </div>
      )}

      {/* Course Form Modal */}
      {showForm && (
        <CourseForm
          course={editingCourse}
          onClose={() => setShowForm(false)}
          onSuccess={() => {
            setShowForm(false);
            setSuccess(editingCourse ? 'تم تحديث الكورس بنجاح' : 'تم إضافة الكورس بنجاح');
            fetchCourses();
          }}
          onError={(msg) => setError(msg)}
        />
      )}

      {/* Courses table */}
      <div className="card overflow-hidden">
        {loading ? (
          <div className="p-8 space-y-4 animate-pulse">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-100 rounded-xl" />
            ))}
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <BookOpen size={48} className="mx-auto mb-4 opacity-50" />
            <p className="text-lg mb-2">لا توجد كورسات بعد</p>
            <p className="text-sm">ابدأ بإضافة كورس جديد</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-right p-4 text-sm font-medium text-gray-500">الكورس</th>
                  <th className="text-right p-4 text-sm font-medium text-gray-500 hidden sm:table-cell">السعر</th>
                  <th className="text-right p-4 text-sm font-medium text-gray-500 hidden md:table-cell">تاريخ الإضافة</th>
                  <th className="text-center p-4 text-sm font-medium text-gray-500">إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {course.image_url ? (
                          <img src={course.image_url} alt={course.title} className="w-12 h-12 rounded-lg object-cover shrink-0" />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-primary-50 flex items-center justify-center shrink-0">
                            <BookOpen className="text-primary-400" size={20} />
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="font-medium text-gray-800 text-sm truncate">{course.title}</p>
                          <p className="text-xs text-gray-400 truncate max-w-xs">{course.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 hidden sm:table-cell">
                      <span className="font-semibold text-primary-600">
                        {course.price > 0 ? `${course.price} ر.س` : 'مجاني'}
                      </span>
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      <span className="text-sm text-gray-500">
                        {new Date(course.created_at).toLocaleDateString('ar-SA')}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => openEditForm(course)}
                          className="p-2 rounded-lg text-primary-600 hover:bg-primary-50 transition-colors"
                          title="تعديل"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(course.id)}
                          className="p-2 rounded-lg text-error-600 hover:bg-error-50 transition-colors"
                          title="حذف"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function CourseForm({
  course,
  onClose,
  onSuccess,
  onError,
}: {
  course: Course | null;
  onClose: () => void;
  onSuccess: () => void;
  onError: (msg: string) => void;
}) {
  const [title, setTitle] = useState(course?.title ?? '');
  const [description, setDescription] = useState(course?.description ?? '');
  const [price, setPrice] = useState(course?.price?.toString() ?? '0');
  const [image_url, setImageUrl] = useState(course?.image_url ?? '');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    onError('');

    const input: CourseInput = {
      title,
      description,
      price: parseFloat(price) || 0,
      image_url,
    };

    let error;
    if (course) {
      ({ error } = await supabase.from('courses').update(input).eq('id', course.id));
    } else {
      ({ error } = await supabase.from('courses').insert(input));
    }

    setSaving(false);
    if (error) {
      onError('فشل حفظ الكورس: ' + error.message);
    } else {
      onSuccess();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg card p-6 max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">
            {course ? 'تعديل الكورس' : 'إضافة كورس جديد'}
          </h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">عنوان الكورس *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="مثال: تطوير الويب المتقدم بـ React"
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">وصف الكورس *</label>
            <textarea
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="وصف مفصل عن محتوى الكورس..."
              rows={4}
              className="input-field resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">السعر (ر.س)</label>
            <input
              type="number"
              min="0"
              step="1"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0"
              className="input-field"
              dir="ltr"
            />
            <p className="text-xs text-gray-400 mt-1">ضع 0 للكورسات المجانية</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">رابط صورة الكورس</label>
            <input
              type="url"
              value={image_url}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://images.pexels.com/..."
              className="input-field"
              dir="ltr"
            />
            {image_url && (
              <img src={image_url} alt="معاينة" className="mt-2 rounded-xl w-full h-32 object-cover" />
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="btn-primary flex-1 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Save size={18} />
              {saving ? 'جاري الحفظ...' : course ? 'حفظ التعديلات' : 'إضافة الكورس'}
            </button>
            <button type="button" onClick={onClose} className="btn-secondary">
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
