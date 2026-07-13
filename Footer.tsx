import { GraduationCap, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { PageRoute } from '../types';

interface FooterProps {
  onNavigate: (page: PageRoute) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      {/* CTA banner */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            لا تؤجل تعلّمك ابدأ اليوم!
          </h2>
          <p className="text-primary-100 max-w-2xl mx-auto mb-6">
            الوقت الأفضل للبدء كان بالأمس، والوقت الثاني الأفضل هو الآن. انضم إلى ZClassroom وابدأ رحلتك نحو مستقبل أفضل.
          </p>
          <button onClick={() => onNavigate('courses')} className="btn-accent">
            تصفح الكورسات الآن
          </button>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                <GraduationCap className="text-white" size={24} />
              </div>
              <span className="text-xl font-bold text-white">
                Z<span className="text-primary-400">Classroom</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              منصة ZClassroom توفر تجربة تعليمية متميزة بمحتوى عربي احترافي. تعلم من الصفر حتى الاحتراف مع أفضل المدرسين.
            </p>
            <div className="flex gap-3 mt-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary-600 hover:text-white transition-all duration-200"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Platform links */}
          <div>
            <h3 className="text-white font-semibold mb-4">المنصة</h3>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => onNavigate('home')} className="hover:text-primary-400 transition-colors">الرئيسية</button></li>
              <li><button onClick={() => onNavigate('courses')} className="hover:text-primary-400 transition-colors">جميع الكورسات</button></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">المدرسون</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">الشهادات</a></li>
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h3 className="text-white font-semibold mb-4">الشركة</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-primary-400 transition-colors">من نحن</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">الوظائف</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">المدونة</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">الشركاء</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">الدعم</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-primary-400" />
                <span>support@zclassroom.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-primary-400" />
                <span dir="ltr">+966 50 123 4567</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-primary-400" />
                <span>الرياض، المملكة العربية السعودية</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-500">
          <p>© 2026 ZClassroom. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}
