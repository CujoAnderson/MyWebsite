/*
  # Initial Schema Setup for MythosForge Writing Platform

  1. New Tables
    - `users`
      - Core user data and authentication
      - Stores user preferences and subscription info
    - `writing_pieces`
      - Stores all writing content
      - Includes metadata and visibility settings
    - `comments`
      - Feedback and annotations on writing pieces
    - `shared_access`
      - Manages sharing permissions
    - `writing_stats`
      - Tracks writing statistics and progress
    - `writing_analysis`
      - Stores AI analysis results

  2. Security
    - RLS enabled on all tables
    - Policies for proper data access control
    - Protected user data and content
*/

-- Users table (extends auth.users)
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  name text NOT NULL,
  subscription_tier text NOT NULL DEFAULT 'FREE',
  word_count_goal integer DEFAULT 0,
  theme text DEFAULT 'light',
  font_size text DEFAULT 'medium',
  font_family text DEFAULT 'sans',
  high_contrast boolean DEFAULT false,
  auto_save boolean DEFAULT true,
  auto_save_interval integer DEFAULT 60,
  auto_analyze boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Writing pieces table
CREATE TABLE IF NOT EXISTS writing_pieces (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id),
  title text NOT NULL,
  content text NOT NULL,
  visibility text NOT NULL DEFAULT 'private',
  word_count integer DEFAULT 0,
  last_edited_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Comments table
CREATE TABLE IF NOT EXISTS comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  writing_piece_id uuid NOT NULL REFERENCES writing_pieces(id),
  user_id uuid NOT NULL REFERENCES users(id),
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Shared access table
CREATE TABLE IF NOT EXISTS shared_access (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  writing_piece_id uuid NOT NULL REFERENCES writing_pieces(id),
  user_id uuid NOT NULL REFERENCES users(id),
  permission text NOT NULL DEFAULT 'view',
  created_at timestamptz DEFAULT now()
);

-- Writing stats table
CREATE TABLE IF NOT EXISTS writing_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id),
  writing_piece_id uuid NOT NULL REFERENCES writing_pieces(id),
  words_written integer DEFAULT 0,
  session_duration integer DEFAULT 0,
  date date DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now()
);

-- Writing analysis table
CREATE TABLE IF NOT EXISTS writing_analysis (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  writing_piece_id uuid NOT NULL REFERENCES writing_pieces(id),
  emotional_tone jsonb,
  show_vs_tell jsonb,
  character_traits jsonb,
  suggestions text[],
  readability_score integer,
  pace_analysis jsonb,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE writing_pieces ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE shared_access ENABLE ROW LEVEL SECURITY;
ALTER TABLE writing_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE writing_analysis ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Users can read their own data
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Users can update their own data
CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Writing pieces policies
CREATE POLICY "Users can CRUD own writing pieces"
  ON writing_pieces
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can read shared writing pieces"
  ON writing_pieces
  FOR SELECT
  TO authenticated
  USING (
    visibility = 'public' OR
    EXISTS (
      SELECT 1 FROM shared_access
      WHERE writing_piece_id = writing_pieces.id
      AND user_id = auth.uid()
    )
  );

-- Comments policies
CREATE POLICY "Users can CRUD own comments"
  ON comments
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can read comments on accessible pieces"
  ON comments
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM writing_pieces
      WHERE id = comments.writing_piece_id
      AND (
        user_id = auth.uid() OR
        visibility = 'public' OR
        EXISTS (
          SELECT 1 FROM shared_access
          WHERE writing_piece_id = writing_pieces.id
          AND user_id = auth.uid()
        )
      )
    )
  );

-- Shared access policies
CREATE POLICY "Users can manage sharing of own pieces"
  ON shared_access
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM writing_pieces
      WHERE id = shared_access.writing_piece_id
      AND user_id = auth.uid()
    )
  );

-- Writing stats policies
CREATE POLICY "Users can CRUD own writing stats"
  ON writing_stats
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid());

-- Writing analysis policies
CREATE POLICY "Users can CRUD own writing analysis"
  ON writing_analysis
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM writing_pieces
      WHERE id = writing_analysis.writing_piece_id
      AND user_id = auth.uid()
    )
  );