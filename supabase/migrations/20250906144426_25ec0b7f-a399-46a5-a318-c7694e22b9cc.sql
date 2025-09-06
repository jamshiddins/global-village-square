-- Check if there are any duplicate users and clean them up
-- First, let's see what we have in profiles table
SELECT user_id, full_name, created_at 
FROM public.profiles 
ORDER BY created_at DESC;

-- Clean up any potential orphaned records
DELETE FROM public.profiles 
WHERE user_id NOT IN (SELECT id FROM auth.users);

-- Also add a constraint to prevent issues
ALTER TABLE public.profiles 
DROP CONSTRAINT IF EXISTS profiles_user_id_key;

ALTER TABLE public.profiles 
ADD CONSTRAINT profiles_user_id_unique UNIQUE (user_id);