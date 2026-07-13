import { BookOpen, Users, Star, ArrowLeft } from 'lucide-react';
import { Course } from '../types';

interface CourseCardProps {
  course: Course;
  onClick: () => void;
}

export default function CourseCard({ course, onClick }: CourseCardProps) {
  return (
    <div
      onClick={onClick}
      className="card card-hover cursor-pointer overflow-hidden group animate-fade-in-up"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        {course.image_url ? (
          <img
            src={course.image_url}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200">
            <BookOpen className="text-primary-400" size={48} />
          </div>
        )}
        <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-semibold text-primary-700 shadow-sm">
          كورس احترافي
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-gray-800 text-lg mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {course.title}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2 mb-4 leading-relaxed">
          {course.description ?? 'لا يوجد وصف'}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
          <span className="flex items-center gap-1">
            <Users size={14} /> 1,200 طالب
          </span>
          <span className="flex items-center gap-1">
            <Star size={14} className="text-accent-400" /> 4.8
          </span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="text-2xl font-bold text-primary-600">
            {course.price > 0 ? `${course.price} ر.س` : 'مجاني'}
          </span>
          <span className="flex items-center gap-1 text-sm font-medium text-primary-600 group-hover:gap-2 transition-all">
            التفاصيل
            <ArrowLeft size={16} />
          </span>
        </div>
      </div>
    </div>
  );
}
