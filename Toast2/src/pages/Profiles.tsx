import React from 'react';
import { useProfiles } from '@/context/ProfileContext';
import { useNavigate } from 'react-router-dom';

export default function Profiles() {
  const { profiles } = useProfiles();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full px-8 py-12 bg-gradient-to-br from-amber-100 via-orange-50 to-blue-200 flex flex-col items-center">
      <h1 className="text-7xl font-bold text-[#28272E] mb-2 mt-4">Profiles</h1>
      <p className="text-2xl text-[#28272E] mb-12 font-normal text-center">Who would you like to<br />see more of&nbsp;?</p>
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {profiles.length === 0 ? (
          <div className="col-span-3 text-center text-xl text-[#28272E]">No profiles yet.</div>
        ) : (
          profiles.map((profile) => {
            const initial = profile.name.trim().charAt(0).toUpperCase();
            return (
              <button
                key={profile.name}
                className="flex flex-col items-center justify-center rounded-3xl shadow-xl bg-white/70 hover:bg-white/90 transition p-8 cursor-pointer border-0 outline-none focus:ring-2 focus:ring-[#6092B6]"
                style={{ minHeight: 280 }}
                onClick={() => navigate(`/profile/${encodeURIComponent(profile.name)}`)}
              >
                <div className="flex items-center justify-center w-36 h-36 rounded-full bg-gradient-to-br from-[#FFFDF7] to-[#E6ECF5] mb-6 text-6xl font-bold text-[#6092B6] shadow-inner">
                  {initial}
                </div>
                <div className="text-2xl font-bold text-[#28272E] mt-2">{profile.name}</div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}