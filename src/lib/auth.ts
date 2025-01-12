import { supabase } from './supabase';
import { Profile, UserSecuritySettings } from '../types/database';

export const AUTH_PROVIDERS = {
  EMAIL: 'email',
  GOOGLE: 'google',
  MICROSOFT: 'azure',
} as const;

export const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes in milliseconds

export interface AuthConfig {
  provider: keyof typeof AUTH_PROVIDERS;
  redirectTo?: string;
}

export async function signUp(email: string, password: string, profile: Partial<Profile>) {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: profile.full_name,
        role: profile.role,
      },
    },
  });

  if (authError) throw authError;

  if (!authData.user) {
    throw new Error('User creation failed');
  }

  // Create security settings
  const { error: securityError } = await supabase
    .from('user_security_settings')
    .insert([{
      id: authData.user.id,
      two_factor_enabled: false,
      session_timeout: '30 minutes',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }]);

  if (securityError) {
    console.error('Error creating security settings:', securityError);
    throw securityError;
  }

  return authData;
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  // Create new session
  const { error: sessionError } = await supabase
    .from('user_sessions')
    .insert([{
      user_id: data.user.id,
      session_token: data.session?.access_token,
      expires_at: new Date(Date.now() + SESSION_TIMEOUT).toISOString(),
    }]);

  if (sessionError) {
    console.error('Error creating session:', sessionError);
  }

  // Log activity
  const { error: logError } = await supabase
    .from('user_activity_logs')
    .insert([{
      user_id: data.user.id,
      action_type: 'login',
      action_description: 'User logged in successfully',
    }]);

  if (logError) {
    console.error('Error logging activity:', logError);
  }

  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function resetPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });

  if (error) throw error;
}

export async function updatePassword(newPassword: string) {
  const { error } = await supabase.auth.updateUser({
    password: newPassword
  });

  if (error) throw error;
}

export async function setupTwoFactor(userId: string, method: 'app' | 'sms' | 'email') {
  const { error } = await supabase
    .from('user_security_settings')
    .update({
      two_factor_enabled: true,
      two_factor_method: method,
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId);

  if (error) throw error;
}

export async function validateIpAccess(userId: string, ip: string) {
  const { data: settings } = await supabase
    .from('user_security_settings')
    .select('ip_whitelist')
    .eq('id', userId)
    .single();

  if (!settings?.ip_whitelist?.length) return true;
  return settings.ip_whitelist.includes(ip);
}

export async function updateSecuritySettings(userId: string, settings: Partial<UserSecuritySettings>) {
  const { error } = await supabase
    .from('user_security_settings')
    .update({
      ...settings,
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId);

  if (error) throw error;
}

export async function logUserActivity(userId: string, actionType: string, description: string) {
  const { error } = await supabase
    .from('user_activity_logs')
    .insert([{
      user_id: userId,
      action_type: actionType,
      action_description: description,
    }]);

  if (error) throw error;
}

export type { Profile, UserSecuritySettings };