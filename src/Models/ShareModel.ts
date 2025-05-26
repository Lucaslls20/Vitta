import { Platform } from 'react-native';
export interface IShareLink {
  title: string;
  message: string;
  url: string;
}

export class ShareModel implements IShareLink {
  title: string;
  message: string;
  url: string;

  constructor(appId: string) {
    // Ajuste o appId para seu pacote Android ou App Store ID
    const storeUrl =
      Platform.OS === 'android'
        ? `https://play.google.com/store/apps/details?id=${appId}`
        : `https://apps.apple.com/app/id${appId}`;

    this.title = 'Confira este app incrível!';
    this.message = 'Eu estou usando este app e acho que você também vai gostar:';
    this.url = storeUrl;
  }
}
