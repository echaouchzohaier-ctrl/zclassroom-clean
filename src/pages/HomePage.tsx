import { useEffect, useState } from 'react';
import { Search, BookOpen, Play, MessageCircle, Award, ArrowLeft, Sparkles, TrendingUp } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Course, PageRoute } from '../types';
import CourseCard from '../components/CourseCard';

interface HomePageProps {
  onNavigate: (page: PageRoute) => void;
  onCourseSelect: (course: Course) => void;
}

const testimonials = [
  {
    name: 'أحمد الزهراني',
    role: 'مطور ويب',
    image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=200',
    text: 'ZClassroom غيّرت مساري المهني بالكامل. تعلمت React من الصفر وأصبحت أعمل في شركة تقنية كبيرة. المحتوى احترافي جداً والمدرسون يردون على جميع أسئلتي.',
  },
  {
    name: 'سارة المالكي',
    role: 'مصممة UI/UX',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
    text: 'أفضل منصة تعليمية عربية على الإطلاق! درست تصميم UI/UX وخرجت بمشروع احترافي في معرض أعمالي. الشهادة ساعدتني كثيراً في الحصول على عملي الحالي.',
  },
  {
    name: 'محمد العتيبي',
    role: 'مهندس برمجيات',
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200',
    text: 'المنصة سهلة الاستخدام والمحتوى منظم بشكل ممتاز. تعلمت Python وتعلم الآلة وطبقت مشاريع حقيقية. أنصح كل من يريد دخول مجال الذكاء الاصطناعي.',
  },
  {
    name: 'نورة القحطاني',
    role: 'مسوقة رقمية',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
    text: 'الكورسات عملية ومباشرة، لا وقت ضائع. طبقت ما تعلمته مباشرة في عملي وشهدت نتائج ملموسة خلال أسابيع. الاستثمار في التعلم هنا يستحق كل ريال.',
  },
];

const steps = [
  { icon: Search, title: 'اختر الكورس المناسب', desc: 'تصفح مئات الكورسات المتخصصة وابحث عن المجال الذي يناسب أهدافك ومستواك الحالي.' },
  { icon: Play, title: 'ابدأ التعلم فوراً', desc: 'شاهد الدروس في أي وقت وأي مكان. محتوى تفاعلي عالي الجودة مع تمارين عملية.' },
  { icon: MessageCircle, title: 'تفاعل واسأل', desc: 'اطرح أسئلتك واحصل على إجابات من المدرسين والمجتمع. لا تبقى عالقاً وحدك.' },
  { icon: Award, title: 'احصل على الشهادة', desc: 'أكمل الكورس واحصل على شهادة معتمدة تضيف قيمة لسيرتك الذاتية ومسيرتك المهنية.' },
];

export default function HomePage({ onNavigate, onCourseSelect }: HomePageProps) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(6)
      .then(({ data, error }) => {
        if (!error && data) setCourses(data as Course[]);
        setLoading(false);
      });
  }, []);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-primary-50">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 right-10 w-72 h-72 bg-primary-200 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-accent-100 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-6 animate-fade-in">
              <Sparkles size={16} />
              منصة التعليم العربي الأولى
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight animate-fade-in-up">
              تعلّم بلا حدود،
              <br />
              <span className="gradient-text">ابدأ رحلتك اليوم</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              أكثر من 500 كورس احترافي بمحتوى عربي حصري، من أفضل المدرسين والخبراء في مجالاتهم. تعلّم المهارات التي يبحث عنها سوق العمل.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <button onClick={() => onNavigate('courses')} className="btn-primary text-base px-8 py-4">
                أبرز الكورسات
                <ArrowLeft size={20} />
              </button>
              <button onClick={() => onNavigate('register')} className="btn-secondary text-base px-8 py-4">
                إنشاء حساب مجاني
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-16 max-w-2xl mx-auto">
              {[
                { value: '+500', label: 'كورس احترافي' },
                { value: '+50,000', label: 'طالب نشط' },
                { value: '+100', label: 'مدرس خبير' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl font-bold text-primary-600">{stat.value}</div>
                  <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-primary-600 text-sm font-medium mb-2">
              <TrendingUp size={16} />
              أبرز الكورسات
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              الكورسات الأكثر طلباً
            </h2>
            <p className="text-gray-500 mt-2">
              اختار من بين أكثر الكورسات شعبية وبدأ رحلتك التعليمية مع أفضل المدرسين
            </p>
          </div>
          <button
            onClick={() => onNavigate('courses')}
            className="hidden sm:flex items-center gap-1 text-primary-600 font-medium hover:gap-2 transition-all"
          >
            عرض الكل
            <ArrowLeft size={18} />
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card p-5 animate-pulse">
                <div className="h-48 bg-gray-200 rounded-xl mb-4" />
                <div className="h-6 bg-gray-200 rounded mb-2 w-3/4" />
                <div className="h-4 bg-gray-200 rounded mb-4 w-full" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <BookOpen size={48} className="mx-auto mb-4 opacity-50" />
            <p>لا توجد كورسات حالياً</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onClick={() => { onCourseSelect(course); onNavigate('course-detail'); }}
              />
            ))}
          </div>
        )}
      </section>

      {/* How it works */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 text-primary-600 text-sm font-medium mb-2">
              <Sparkles size={16} />
              كيف يعمل ZClassroom
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              أربع خطوات نحو الاحتراف
            </h2>
            <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
              رحلة تعليمية مصممة بعناية لتضمن لك تجربة تعلم ممتعة وفعّالة تصل بك إلى أهدافك
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="relative text-center group">
                  <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-md border border-gray-100 mb-4 group-hover:shadow-lg group-hover:border-primary-200 transition-all duration-300">
                    <Icon className="text-primary-600" size={28} />
                    <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary-600 text-white text-sm font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-primary-600 text-sm font-medium mb-2">
            <Award size={16} />
            قصص النجاح
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            آراء طلابنا
          </h2>
          <p className="text-gray-500 mt-2">
            أكثر من 50,000 طالب غيّروا مساراتهم المهنية بفضل ZClassroom
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="card p-6 card-hover animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="flex items-center gap-3 mb-4">
                <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover" loading="lazy" />
                <div>
                  <h4 className="font-bold text-gray-800 text-sm">{t.name}</h4>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">"{t.text}"</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
