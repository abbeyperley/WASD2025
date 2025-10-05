import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

// Profile type
type Profile = {
  name: string;
  birthday: string;
  iconColor?: string;
  reminderPreference?: string;
  categories?: { [key: string]: string };
  notes?: string;
};

type ProfileContextType = {
  profiles: Profile[];
  addProfile: (profile: Profile) => void;
  updateProfile: (name: string, updated: Profile) => void;
  removeProfile: (name: string) => void;
  getProfileBirthday: (name: string) => string | undefined;
  signupName: string;
  setSignupName: (name: string) => void;
  categories: string[];
  addCategory: (category: string) => void;
  removeCategory: (category: string) => void;
};


const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function useProfiles() {
  const context = useContext(ProfileContext);
  if (!context) throw new Error('useProfiles must be used within a ProfileProvider');
  return context;
}


export function ProfileProvider({ children }: { children: ReactNode }) {
  // Always start with only the Abbey profile and default category
  const [profiles, setProfiles] = useState<Profile[]>(() => {
    const stored = localStorage.getItem('profiles');
    return stored ? JSON.parse(stored) : [];
  });
  const [signupName, setSignupName] = useState('');
  const [categories, setCategories] = useState<string[]>(['Notes']);

  // Save profiles and categories to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('profiles', JSON.stringify(profiles));
  }, [profiles]);
  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);
  const addCategory = (category: string) => {
    setCategories((prev) => prev.includes(category) ? prev : [...prev, category]);
  };

  const removeCategory = (category: string) => {
    setCategories((prev) => prev.filter((c) => c !== category));
  };


  const addProfile = (profile: Profile) => {
    setProfiles((prev) => [...prev, profile]);
  };

  const updateProfile = (name: string, updated: Profile) => {
    setProfiles((prev) => prev.map((p) => (p.name === name ? { ...updated } : p)));
  };

  const removeProfile = (name: string) => {
    setProfiles((prev) => prev.filter((p) => p.name !== name));
  };

  const getProfileBirthday = (name: string) => {
    return profiles.find((p) => p.name === name)?.birthday;
  };

  return (
    <ProfileContext.Provider value={{ profiles, addProfile, updateProfile, removeProfile, getProfileBirthday, signupName, setSignupName, categories, addCategory, removeCategory }}>
      {children}
    </ProfileContext.Provider>
  );
}
