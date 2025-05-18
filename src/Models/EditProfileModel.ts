export interface EditProfileModel {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  profileImageUri: string;
  loading: boolean;
  error: string | null;
  loadProfile: () => Promise<void>;
  saveProfile: () => Promise<void>;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setPhoneNumber: (phone: string) => void;
  setPassword: (password: string) => void;
  setConfirmPassword: (confirm: string) => void;
  setProfileImageUri: (uri: string) => void;
   pickProfileImage: () => Promise<void>;
}