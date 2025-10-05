
// Extend the Window interface to allow __testProfilesAdded
declare global {
  interface Window {
    __testProfilesAdded?: boolean;
  }
}

import { useEffect } from 'react';
import { useProfiles } from '@/context/ProfileContext';

export default function TestProfile() {
  const { addProfile, profiles, removeProfile } = useProfiles();

  useEffect(() => {
    // Prevent double-add in React StrictMode/dev
    if (window.__testProfilesAdded) return;
    if (profiles.length === 0) {
      const testProfiles = [
        { name: 'Denzil', birthday: 'September 17' },
        { name: 'Abbey', birthday: 'February 21' },
        { name: 'Winnie', birthday: 'February 8' },
      ];
      testProfiles.forEach((profile) => {
        addProfile(profile);
      });
      window.__testProfilesAdded = true;
    }
    // eslint-disable-next-line
  }, [profiles]);

  // Debug: log profiles to verify data
  console.log('profiles:', profiles);

  // Handler to reset all profiles
  const handleResetProfiles = () => {
    // Remove from localStorage
    localStorage.removeItem('profiles');
    // Remove from context
    profiles.forEach((profile) => removeProfile(profile.name));
    window.location.reload(); // Reload to update UI everywhere
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-100 via-orange-50 to-blue-200 font-[PP Fragment Text Regular]">
      <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
        <h2 className="text-3xl font-bold mb-4 text-[#28272E]">Test Profiles Added</h2>
        <p className="text-lg text-[#28272E]">Name: <b>Denzil</b> — Birthday: <b>September 17</b></p>
        <p className="text-lg text-[#28272E]">Name: <b>Abbey</b> — Birthday: <b>February 21</b></p>
        <p className="text-lg text-[#28272E]">Name: <b>Winnie</b> — Birthday: <b>February 8</b></p>
        <button
          className="mt-6 px-6 py-2 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors"
          onClick={handleResetProfiles}
        >
          Reset Profiles
        </button>
      </div>
    </div>
  );
}
