// Environment variable validation and configuration
const config = {
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL,
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  },
  deepgram: {
    apiKey: import.meta.env.VITE_DEEPGRAM_API_KEY,
  },
  security: {
    maxLoginAttempts: Number(import.meta.env.VITE_MAX_LOGIN_ATTEMPTS) || 5,
    loginTimeoutMinutes: Number(import.meta.env.VITE_LOGIN_TIMEOUT_MINUTES) || 15,
    sessionTimeoutMinutes: Number(import.meta.env.VITE_SESSION_TIMEOUT_MINUTES) || 30,
    require2FA: import.meta.env.VITE_REQUIRE_2FA === 'true',
  }
};

// Validate required environment variables
const requiredVars = [
  ['VITE_SUPABASE_URL', config.supabase.url],
  ['VITE_SUPABASE_ANON_KEY', config.supabase.anonKey],
  ['VITE_DEEPGRAM_API_KEY', config.deepgram.apiKey],
];

for (const [name, value] of requiredVars) {
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
}

export default config;