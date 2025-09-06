import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.a46f6181d9e04095bbd1f9711851999d',
  appName: 'SpecTechMarketplace',
  webDir: 'dist',
  server: {
    url: 'https://a46f6181-d9e0-4095-bbd1-f9711851999d.lovableproject.com?forceHideBadge=true',
    cleartext: true,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,
    },
  },
};

export default config;