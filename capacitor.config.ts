import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'br.com.belomonte',
  appName: 'private-qrcode',
  webDir: 'docs',
  server: {
    androidScheme: 'https'
  }
};

export default config;
