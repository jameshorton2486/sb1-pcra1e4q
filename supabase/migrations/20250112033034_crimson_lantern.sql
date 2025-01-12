/*
  # Fix profile completeness validation
  
  1. Changes
    - Remove incorrect policy
    - Add proper trigger-based validation
  
  2. Security
    - Maintain RLS while adding data validation
*/

-- Drop the incorrect policy if it exists
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "enforce_profile_completeness" ON profiles;
END $$;

-- Create a proper validation trigger
CREATE OR REPLACE FUNCTION check_profile_completeness()
RETURNS TRIGGER AS $$
BEGIN
  IF (NEW.full_name IS NULL OR NEW.full_name = '') THEN
    RAISE EXCEPTION 'Profile name cannot be empty';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'enforce_profile_completeness'
  ) THEN
    CREATE TRIGGER enforce_profile_completeness
      BEFORE UPDATE ON profiles
      FOR EACH ROW
      EXECUTE FUNCTION check_profile_completeness();
  END IF;
END $$;