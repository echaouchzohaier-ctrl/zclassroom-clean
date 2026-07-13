import { useEffect, useState } from 'react';
import { Search, BookOpen, SlidersHorizontal } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Course, PageRoute } from '../types';
import CourseCard from '../components/CourseCard';

interface CoursesPageProps {
  onNavigate: (page: PageRoute) => void;
  onCourseSelect: (course: Course) => void;
}

export default function CoursesPage({ onNavigate, onCourseSelect }: CoursesPageProps) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (!error && data) setCourses(data as Course[]);
        setLoading(false);
      });
  }, []);

  const filtered = courses.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    (c.description ?? '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">جميع الكورسات</h1>
        <p className="text-gray-500">تصفح أكثر من {courses.length} كورس احترافي بمحتوى عربي حصري</p>
      </div>

      {/* Search bar */}
      <div className="flex gap-3 mb-8">
        <div className="relative flex-1">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="ابحث عن كورس..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pr-12"
          />
        </div>
        <button className="btn-secondary px-4">
          <SlidersHorizontal size={20} />
          <span className="hidden sm:inline">تصفية</span>
        </button>
      </div>

      {/* Results */}
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
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <BookOpen size={48} className="mx-auto mb-4 opacity-50" />
          <p className="text-lg">لا توجد كورسات مطابقة لبحثك</p>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-500 mb-4">{filtered.length} كورس</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onClick={() => { onCourseSelect(course); onNavigate('course-detail'); }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
