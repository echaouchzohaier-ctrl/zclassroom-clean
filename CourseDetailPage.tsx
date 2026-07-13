import { Users, Star, Clock, BarChart, CheckCircle, Play, ArrowRight, BookOpen } from 'lucide-react';
import { Course, PageRoute } from '../types';

interface CourseDetailPageProps {
  course: Course | null;
  onNavigate: (page: PageRoute) => void;
}

export default function CourseDetailPage({ course, onNavigate }: CourseDetailPageProps) {
  if (!course) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <BookOpen size={48} className="mx-auto mb-4 text-gray-300" />
        <p className="text-gray-500 mb-4">لم يتم العثور على الكورس</p>
        <button onClick={() => onNavigate('courses')} className="btn-primary">
          <ArrowRight size={18} />
          العودة للكورسات
        </button>
      </div>
    );
  }

  const features = [
    'أكثر من 40 ساعة محتوى فيديو',
    'تمارين عملية ومشاريع حقيقية',
    'شهادة إتمام معتمدة',
    'وصول مدى الحياة للمحتوى',
    'دعم مباشر من المدرس',
    'تحديثات مجانية مستمرة',
  ];

  return (
    <div className="animate-fade-in">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <button
          onClick={() => onNavigate('courses')}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-primary-600 transition-colors"
        >
          <ArrowRight size={16} />
          العودة للكورسات
        </button>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-sm font-medium mb-4">
                كورس احترافي
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-primary-100 leading-relaxed mb-6">
                {course.description ?? 'لا يوجد وصف متاح لهذا الكورس'}
              </p>
              <div className="flex items-center gap-6 text-sm">
                <span className="flex items-center gap-1">
                  <Users size={16} /> 1,200 طالب
                </span>
                <span className="flex items-center gap-1">
                  <Star size={16} className="text-accent-300" /> 4.8
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={16} /> 40 ساعة
                </span>
                <span className="flex items-center gap-1">
                  <BarChart size={16} /> متوسط
                </span>
              </div>
            </div>
            <div className="hidden lg:block">
              {course.image_url && (
                <img
                  src={course.image_url}
                  alt={course.title}
                  className="rounded-2xl shadow-2xl w-full h-64 object-cover"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4">عن الكورس</h2>
              <p className="text-gray-600 leading-relaxed">
                {course.description ?? 'لا يوجد وصف متاح لهذا الكورس'}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4">ماذا ستتعلم</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {features.map((f, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle className="text-success-500 mt-0.5 shrink-0" size={20} />
                    <span className="text-gray-600 text-sm">{f}</span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4">محتوى الكورس</h2>
              <div className="space-y-2">
                {['المقدمة والأساسيات', 'المفاهيم المتقدمة', 'المشاريع العملية', 'الاختبار النهائي والشهادة'].map((mod, i) => (
                  <div key={i} className="card p-4 flex items-center justify-between hover:border-primary-200 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center">
                        <Play className="text-primary-600" size={18} />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 text-sm">الوحدة {i + 1}: {mod}</h4>
                        <p className="text-xs text-gray-400">5 دروس · 45 دقيقة</p>
                      </div>
                    </div>
                    <span className="text-sm text-primary-600 font-medium">عرض</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-20">
              {course.image_url && (
                <img src={course.image_url} alt={course.title} className="rounded-xl w-full h-40 object-cover mb-4" />
              )}
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-primary-600 mb-1">
                  {course.price > 0 ? `${course.price} ر.س` : 'مجاني'}
                </div>
                <p className="text-sm text-gray-400">سعر واحد، وصول مدى الحياة</p>
              </div>
              <button className="btn-primary w-full mb-3">
                <Play size={18} />
                اشترك الآن
              </button>
              <button className="btn-secondary w-full">
                إضافة للمفضلة
              </button>

              <div className="mt-6 pt-6 border-t border-gray-100 space-y-3 text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>مدة الكورس</span>
                  <span className="text-gray-700 font-medium">40 ساعة</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>عدد الدروس</span>
                  <span className="text-gray-700 font-medium">120 درس</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>المستوى</span>
                  <span className="text-gray-700 font-medium">متوسط</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>اللغة</span>
                  <span className="text-gray-700 font-medium">العربية</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>الشهادة</span>
                  <span className="text-success-600 font-medium">نعم</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
