/*
  # Clean up and enhance profiles
  
  1. Changes
    - Add missing profile fields
    - Add additional security policies
    - Add profile update trigger
  
  2. Security
    - Enhanced RLS policies
    - Automatic timestamp updates
*/

-- Add missing fields and enhancements to profiles if they don't exist
DO $$ 
BEGIN
  -- Add last_active timestamp
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'last_active'
  ) THEN
    ALTER TABLE profiles ADD COLUMN last_active TIMESTAMPTZ;
  END IF;

  -- Add profile_complete flag
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'profile_complete'
  ) THEN
    ALTER TABLE profiles ADD COLUMN profile_complete BOOLEAN DEFAULT FALSE;
  END IF;
END $$;

-- Create function to automatically update timestamps
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'set_timestamp'
  ) THEN
    CREATE TRIGGER set_timestamp
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();
  END IF;
END $$;

-- Add policy for profile completeness check
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'enforce_profile_completeness'
  ) THEN
    CREATE POLICY "enforce_profile_completeness"
    ON profiles
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = id)
    WITH CHECK (
      (NEW.full_name IS NOT NULL AND NEW.full_name != '') OR
      (OLD.full_name IS NOT NULL AND OLD.full_name != '')
    );
  END IF;
END $$;