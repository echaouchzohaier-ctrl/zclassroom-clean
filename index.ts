export type UserRole = 'student' | 'teacher';

export interface Profile {
  id: string;
  email: string | null;
  full_name: string | null;
  role: UserRole;
  is_admin: boolean;
  created_at: string;
}

export interface Course {
  id: string;
  title: string;
  description: string | null;
  price: number;
  image_url: string | null;
  teacher_id: string | null;
  created_at: string;
}

export interface CourseInput {
  title: string;
  description: string;
  price: number;
  image_url: string;
}

export type PageRoute =
  | 'home'
  | 'courses'
  | 'course-detail'
  | 'login'
  | 'register'
  | 'teacher-dashboard'
  | 'profile';
