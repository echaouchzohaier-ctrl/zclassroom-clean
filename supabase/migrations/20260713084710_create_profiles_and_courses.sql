/*
# Create profiles and courses tables for ZClassroom

## Overview
Creates the core schema for the ZClassroom educational platform:
- `profiles` table stores user role information (student/teacher)
- `courses` table stores course catalog data with lowercase column names

## New Tables

### profiles
- `id` (uuid, primary key, references auth.users) — one row per auth user
- `email` (text) — cached email for quick lookups
- `full_name` (text) — display name
- `role` (text, default 'student') — values: 'student' or 'teacher'
- `is_admin` (boolean, default false) — admin flag
- `created_at` (timestamptz) — row creation timestamp

### courses
- `id` (uuid, primary key)
- `title` (text, not null) — course title
- `description` (text) — course description
- `price` (numeric, default 0) — course price
- `image_url` (text) — course cover image URL
- `teacher_id` (uuid, references auth.users) — owner/teacher of the course
- `created_at` (timestamptz) — row creation timestamp

## Security
- RLS enabled on both tables.
- profiles: authenticated users can read/update only their own row; insert own row on signup.
- courses: anyone (anon + authenticated) can read the catalog; only authenticated teachers can insert/update/delete their own courses.

## Notes
1. The `role` column is text (not an enum) per requirement, with values 'student' and 'teacher'.
2. Courses use lowercase column names: title, description, price, image_url.
3. teacher_id defaults to auth.uid() so inserts from teachers succeed without passing it explicitly.
*/

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  full_name text,
  role text NOT NULL DEFAULT 'student',
  is_admin boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_profile" ON profiles;
CREATE POLICY "select_own_profile" ON profiles FOR SELECT
  TO authenticated USING (auth.uid() = id);

DROP POLICY IF EXISTS "insert_own_profile" ON profiles;
CREATE POLICY "insert_own_profile" ON profiles FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "update_own_profile" ON profiles;
CREATE POLICY "update_own_profile" ON profiles FOR UPDATE
  TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- Courses table
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  price numeric DEFAULT 0,
  image_url text,
  teacher_id uuid DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- Anyone can read the course catalog (public)
DROP POLICY IF EXISTS "read_courses" ON courses;
CREATE POLICY "read_courses" ON courses FOR SELECT
  TO anon, authenticated USING (true);

-- Only authenticated users can create courses (teachers)
DROP POLICY IF EXISTS "insert_courses" ON courses;
CREATE POLICY "insert_courses" ON courses FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = teacher_id);

-- Only the course owner can update
DROP POLICY IF EXISTS "update_own_courses" ON courses;
CREATE POLICY "update_own_courses" ON courses FOR UPDATE
  TO authenticated USING (auth.uid() = teacher_id) WITH CHECK (auth.uid() = teacher_id);

-- Only the course owner can delete
DROP POLICY IF EXISTS "delete_own_courses" ON courses;
CREATE POLICY "delete_own_courses" ON courses FOR DELETE
  TO authenticated USING (auth.uid() = teacher_id);
