-- ============================================================================
-- Trust Axis — Supabase SQL Migrations
-- Run these in order in your Supabase Dashboard → SQL Editor
-- ============================================================================

-- ─── Migration 01: Enable UUID extension (if not already enabled) ─────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── Migration 02: Create public.users table ──────────────────────────────────
-- Mirrors auth.users and stores role, rewards, etc.
CREATE TABLE IF NOT EXISTS public.users (
  id            UUID        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email         TEXT        UNIQUE NOT NULL,
  name          TEXT,
  avatar_url    TEXT,
  role          TEXT        NOT NULL DEFAULT 'student' CHECK (role IN ('student','trainer','admin')),
  reward_points INTEGER     NOT NULL DEFAULT 0,
  reward_tier   TEXT        NOT NULL DEFAULT 'bronze',
  last_login_at TIMESTAMPTZ,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);

-- ─── Migration 03: Auto-create public.users row on auth signup ────────────────
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ─── Migration 04: Create student_profiles table ──────────────────────────────
CREATE TABLE IF NOT EXISTS public.student_profiles (
  id                   UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id              UUID        UNIQUE NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,

  -- Onboarding fields (collected in modal)
  phone                TEXT,
  current_status       TEXT        CHECK (current_status IN ('student','working_professional','job_seeker')),
  area_of_interest     TEXT[],     -- Array of interests
  goal                 TEXT[],     -- Array of goals
  onboarding_done      BOOLEAN     NOT NULL DEFAULT FALSE,

  -- Education (filled on profile page)
  education_level      TEXT,       -- high_school | bachelors | masters | phd | other
  degree               TEXT,
  college              TEXT,
  graduation_year      INTEGER,

  -- Work Experience
  current_company      TEXT,
  job_role             TEXT,
  years_experience     INTEGER,

  -- Skills
  skills_known         TEXT[],
  tools_known          TEXT[],
  skill_level          TEXT        CHECK (skill_level IN ('beginner','intermediate','advanced')),

  -- Career Goals
  target_job_role      TEXT,
  target_companies     TEXT[],
  expected_salary      TEXT,
  resume_url           TEXT,
  linkedin_url         TEXT,

  -- Learning Preferences
  study_hours_per_week INTEGER,
  learning_mode        TEXT        CHECK (learning_mode IN ('live','self_paced')),

  created_at           TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_student_profiles_user_id ON public.student_profiles(user_id);

-- ─── Migration 05: Auto-create student_profile row after public.users insert ──
CREATE OR REPLACE FUNCTION public.handle_new_student_profile()
RETURNS TRIGGER AS $$
BEGIN
  -- Only create a profile for students (default role)
  INSERT INTO public.student_profiles (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_user_created_create_profile ON public.users;
CREATE TRIGGER on_user_created_create_profile
  AFTER INSERT ON public.users
  FOR EACH ROW
  WHEN (NEW.role = 'student')
  EXECUTE FUNCTION public.handle_new_student_profile();

-- ─── Migration 06: Enable Row Level Security ──────────────────────────────────
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_profiles ENABLE ROW LEVEL SECURITY;

-- Users can read their own row
CREATE POLICY "Users can view own record"
  ON public.users FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own row
CREATE POLICY "Users can update own record"
  ON public.users FOR UPDATE
  USING (auth.uid() = id);

-- Users can read their own student_profile
CREATE POLICY "Users can view own profile"
  ON public.student_profiles FOR SELECT
  USING (auth.uid() = user_id);

-- Users can update their own student_profile
CREATE POLICY "Users can update own profile"
  ON public.student_profiles FOR UPDATE
  USING (auth.uid() = user_id);

-- ─── Migration 07: Updated_at auto-trigger ────────────────────────────────────
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_student_profiles_updated_at
  BEFORE UPDATE ON public.student_profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
