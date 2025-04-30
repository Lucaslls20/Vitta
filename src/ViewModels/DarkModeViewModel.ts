import { useState, useEffect, useContext } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import SettingsModel, { UserSettings } from '../Models/DarkModeModel';
import { auth } from '../Services/firebaseConfig';
import { ThemeContext } from '../View/theme';

export default function useSettingsViewModel(): {
  user: User | null;
  loading: boolean;
  settings: UserSettings;
  toggleDarkMode: () => Promise<void>;
  toggleNotifications: () => Promise<void>;
} {
  const [user, setUser] = useState<User | null>(null);
  const [settings, setSettings] = useState<UserSettings>({ darkMode: false, notifications: true });
  const [loading, setLoading] = useState(true);
  const { setDarkMode: setGlobalDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        const loaded = await SettingsModel.loadSettings(u.uid);
        setSettings(loaded);
        setGlobalDarkMode(loaded.darkMode);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const toggleDarkMode = async () => {
    if (!user) return;
    const updated = { ...settings, darkMode: !settings.darkMode };
    setSettings(updated);
    setGlobalDarkMode(updated.darkMode);
    await SettingsModel.saveSettings(user.uid, updated);
  };

  const toggleNotifications = async () => {
    if (!user) return;
    const updated = { ...settings, notifications: !settings.notifications };
    setSettings(updated);
    await SettingsModel.saveSettings(user.uid, updated);
  };

  return {
    user,
    loading,
    settings,
    toggleDarkMode,
    toggleNotifications,
  };
}