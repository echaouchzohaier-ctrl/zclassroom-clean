/*
# Add trigger to auto-create profile on signup

## Overview
When a new user registers via Supabase Auth, automatically create a corresponding row
in the `profiles` table with the default role 'student'.

## Changes
- Creates function `handle_new_user()` that inserts into profiles using the new user's id and email.
- Creates trigger `on_auth_user_created` to call it after each INSERT on auth.users.

## Notes
1. The function is SECURITY DEFINER so it can write to profiles even though the trigger runs in the auth context.
2. Idempotent: uses IF NOT EXISTS checks and drops trigger/function first.
*/

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
