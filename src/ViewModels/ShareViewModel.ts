// ShareViewModel.ts
import { Share, Platform, Alert } from 'react-native';
import { ShareModel } from '../Models/ShareModel';

export class ShareViewModel {
  private model: ShareModel;

  constructor(appId: string) {
    this.model = new ShareModel(appId);
  }

  public async shareApp(): Promise<void> {
    try {
      const { title, message, url } = this.model;
      await Share.share(
        {
          title,
          message: `${message} ${url}`,
          url, // no Android, o url entra junto na propriedade `message`
        },
        {
          // Opcional: força o diálogo nativo de compartilhamento
          dialogTitle: title,
        }
      );
    } catch (err: any) {
      console.warn('Erro ao compartilhar:', err);
      Alert.alert(
        'Oops',
        'Não foi possível abrir o compartilhamento. Tente novamente mais tarde.'
      );
    }
  }
}
