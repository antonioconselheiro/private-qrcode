import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'br.com.belomonte.privateqrcode',
  appName: 'Private QRCode',
  webDir: 'docs',
  server: {
    androidScheme: 'https'
  }
};

export default config;
