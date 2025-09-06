-- Create a test user for demonstration
-- First, let's create the user in auth.users table directly
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'test@maydon.ru',
  crypt('maydon123', gen_salt('bf')),
  now(),
  null,
  null,
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"Тестовый Пользователь"}',
  now(),
  now(),
  '',
  '',
  '',
  ''
);

-- Create profile for test user
-- The trigger should handle this automatically, but let's make sure
DO $$
DECLARE
    test_user_id uuid;
BEGIN
    SELECT id INTO test_user_id FROM auth.users WHERE email = 'test@maydon.ru';
    
    IF test_user_id IS NOT NULL THEN
        INSERT INTO public.profiles (user_id, full_name, company_name, company_id, role)
        VALUES (
            test_user_id,
            'Тестовый Пользователь',
            'ООО "ТехноТрейд"',
            'TEST123456',
            'admin'
        )
        ON CONFLICT (user_id) DO UPDATE SET
            full_name = EXCLUDED.full_name,
            company_name = EXCLUDED.company_name,
            company_id = EXCLUDED.company_id,
            role = EXCLUDED.role;
    END IF;
END $$;