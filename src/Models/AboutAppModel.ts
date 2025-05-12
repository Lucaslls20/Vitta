// src/models/AppInfo.ts

// Interface para providers de API
export interface ApiProvider {
  id?: string;
  name: string;
  description: string;
  link: string;
  icon: string;
}

// Interface para informações do App
export interface AppInfo {
  id?: string;
  version: string;
  developer: string;
  lastUpdate: string;
  description: string;
  apiProviders: ApiProvider[];
  features: string[];
}

// Interface para os dados do contato
export interface ContactInfo {
  email: string;
  appStoreId: string;
  playStoreId: string;
}

// Classe de repositório para gerenciar dados do AppInfo no Firestore
import { db } from "../Services/firebaseConfig";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";

const APP_INFO_COLLECTION = 'appInfo';
const CONTACT_INFO_COLLECTION = 'contactInfo';
const CURRENT_DOC = 'current';

export class AppInfoRepository {
  // Obter informações do app do Firestore
  async getAppInfo(): Promise<AppInfo | null> {
    try {
      const appInfoDoc = doc(db, APP_INFO_COLLECTION, CURRENT_DOC);
      const appInfoSnapshot = await getDoc(appInfoDoc);

      if (appInfoSnapshot.exists()) {
        const data = appInfoSnapshot.data();
        if (data && data.version && data.developer) {
          return data as AppInfo;
        } else {
          console.error('Dados incompletos encontrados no Firestore');
          return null;
        }
      } else {
        console.log('Nenhuma informação do app encontrada no Firestore');
        return null;
      }
    } catch (error: any) {
      console.error(`Erro ao buscar informações do app: ${error.message}`, error);
      return null;
    }
  }

  // Obter informações de contato
  async getContactInfo(): Promise<ContactInfo | null> {
    try {
      const contactInfoDoc = doc(db, CONTACT_INFO_COLLECTION, CURRENT_DOC);
      const contactInfoSnapshot = await getDoc(contactInfoDoc);

      if (contactInfoSnapshot.exists()) {
        return contactInfoSnapshot.data() as ContactInfo;
      } else {
        console.log('Nenhuma informação de contato encontrada no Firestore');
        return null;
      }
    } catch (error: any) {
      console.error(`Erro ao buscar informações de contato: ${error.message}`, error);
      return null;
    }
  }

  // Atualizar informações do app
  async updateAppInfo(appInfo: AppInfo): Promise<boolean> {
    try {
      const appInfoDoc = doc(db, APP_INFO_COLLECTION, CURRENT_DOC);
      await setDoc(appInfoDoc, appInfo, { merge: true });
      return true;
    } catch (error: any) {
      console.error(`Erro ao atualizar informações do app: ${error.message}`, error);
      return false;
    }
  }

  // Atualizar informações de contato
  async updateContactInfo(contactInfo: ContactInfo): Promise<boolean> {
    try {
      const contactInfoDoc = doc(db, CONTACT_INFO_COLLECTION, CURRENT_DOC);
      await setDoc(contactInfoDoc, contactInfo, { merge: true });
      return true;
    } catch (error: any) {
      console.error(`Erro ao atualizar informações de contato: ${error.message}`, error);
      return false;
    }
  }

  // Dados de fallback caso não seja possível carregar do Firestore
  getDefaultAppInfo(): AppInfo {
    return {
      version: '1.0',
      developer: 'Lucas Santos',
      lastUpdate: 'April 29, 2025',
      description: 'Nutrition app that helps users track their daily food intake, find healthy recipes, and manage their nutritional goals.',
      apiProviders: [
        {
          name: 'Spoonacular',
          description: 'Recipe and Food Information API',
          link: 'https://spoonacular.com/food-api',
          icon: 'food-apple',
        },
        {
          name: 'Nutritionix',
          description: 'Detailed nutritional data',
          link: 'https://www.nutritionix.com/business/api',
          icon: 'nutrition',
        },
        {
          name: 'Firebase Firestore',
          description: 'Cloud storage for user data',
          link: 'https://firebase.google.com/products/firestore',
          icon: 'firebase',
        },
      ],
      features: [
        'Healthy Recipe Search',
        'Daily Nutrition Tracker',
        'Food Nutrition Analysis',
        'Food Consumption History',
        'Personalized Suggestions',
        'Cloud Sync',
        'Offline Mode',
      ],
    };
  }

  // Dados de contato padrão
  getDefaultContactInfo(): ContactInfo {
    return {
      email: 'contato@vittaapp.com',
      appStoreId: 'id1234567890',
      playStoreId: 'com.vitta.nutrition',
    };
  }
}