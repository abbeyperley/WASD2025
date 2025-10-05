import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

// Profile type
type Profile = {
  name: string;
  birthday: string;
  // Add more fields as needed
};

type ProfileContextType = {
  profiles: Profile[];
  addProfile: (profile: Profile) => void;
  removeProfile: (name: string) => void;
  getProfileBirthday: (name: string) => string | undefined;
  signupName: string;
  setSignupName: (name: string) => void;
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function useProfiles() {
  const context = useContext(ProfileContext);
  if (!context) throw new Error('useProfiles must be used within a ProfileProvider');
  return context;
}

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [signupName, setSignupName] = useState('');

  const addProfile = (profile: Profile) => {
    setProfiles((prev) => [...prev, profile]);
  };

  const removeProfile = (name: string) => {
    setProfiles((prev) => prev.filter((p) => p.name !== name));
  };

  const getProfileBirthday = (name: string) => {
    return profiles.find((p) => p.name === name)?.birthday;
  };

  return (
    <ProfileContext.Provider value={{ profiles, addProfile, removeProfile, getProfileBirthday, signupName, setSignupName }}>
      {children}
    </ProfileContext.Provider>
  );
}
