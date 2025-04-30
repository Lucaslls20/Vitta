import { db } from '../Services/firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export interface UserSettings {
  darkMode: boolean;
  notifications: boolean;
}

class SettingsModel {
  private static collection = 'userSettings';

  static async loadSettings(userId: string): Promise<UserSettings> {
    const ref = doc(db, this.collection, userId);
    const snapshot = await getDoc(ref);
    if (snapshot.exists()) {
      return snapshot.data() as UserSettings;
    }
    return { darkMode: false, notifications: true };
  }

  static async saveSettings(userId: string, settings: UserSettings): Promise<void> {
    const ref = doc(db, this.collection, userId);
    await setDoc(ref, settings, { merge: true });
  }
}

export default SettingsModel;
