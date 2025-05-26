/*
  # Initial Schema Setup

  1. Tables
    - profiles
      - id (uuid, references auth.users)
      - created_at (timestamp)
      - updated_at (timestamp)
      - full_name (text)
      - company_name (text)
      
    - services
      - id (uuid)
      - name (text)
      - description (text)
      - price (numeric)
      - type (text) - 'pterodactyl' or 'virtfusion'
      - specs (jsonb)
      - created_at (timestamp)
      
    - subscriptions
      - id (uuid)
      - user_id (uuid, references profiles)
      - service_id (uuid, references services)
      - status (text)
      - current_period_end (timestamp)
      - created_at (timestamp)
      
    - tickets
      - id (uuid)
      - user_id (uuid, references profiles)
      - title (text)
      - description (text)
      - status (text)
      - created_at (timestamp)
      
    - ticket_replies
      - id (uuid)
      - ticket_id (uuid, references tickets)
      - user_id (uuid, references profiles)
      - message (text)
      - created_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add appropriate policies for each table
*/

-- Create profiles table
CREATE TABLE profiles (
  id uuid REFERENCES auth.users PRIMARY KEY,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  full_name text,
  company_name text
);

-- Create services table
CREATE TABLE services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price numeric NOT NULL,
  type text NOT NULL CHECK (type IN ('pterodactyl', 'virtfusion')),
  specs jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Create subscriptions table
CREATE TABLE subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles NOT NULL,
  service_id uuid REFERENCES services NOT NULL,
  status text NOT NULL CHECK (status IN ('active', 'canceled', 'past_due')),
  current_period_end timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create tickets table
CREATE TABLE tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  status text NOT NULL CHECK (status IN ('open', 'in_progress', 'closed')),
  created_at timestamptz DEFAULT now()
);

-- Create ticket replies table
CREATE TABLE ticket_replies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id uuid REFERENCES tickets NOT NULL,
  user_id uuid REFERENCES profiles NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE ticket_replies ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read their own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Everyone can read services"
  ON services FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can read their own subscriptions"
  ON subscriptions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can read their own tickets"
  ON tickets FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create tickets"
  ON tickets FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read replies to their tickets"
  ON ticket_replies FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM tickets
      WHERE tickets.id = ticket_id
      AND tickets.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create replies to their tickets"
  ON ticket_replies FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM tickets
      WHERE tickets.id = ticket_id
      AND tickets.user_id = auth.uid()
    )
  );