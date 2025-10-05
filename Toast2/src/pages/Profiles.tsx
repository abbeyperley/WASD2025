//
import FadeIn from '@/components/ui/FadeIn';
import { useProfiles } from '@/context/ProfileContext';
import { useNavigate } from 'react-router-dom';
import LogoPopover from '@/components/ui/LogoPopover';

export default function Profiles() {
  const { profiles } = useProfiles();
  const navigate = useNavigate();

  return (
  <div className="min-h-screen w-full px-8 py-12 bg-gradient-to-br from-amber-100 via-orange-50 to-blue-200 flex flex-col items-center relative">
      <div className="absolute top-8 left-8 z-50">
        <button
          className="px-6 py-2 rounded-2xl shadow text-lg font-medium transition-colors bg-white/80 hover:bg-black/10 focus:bg-black/20 border border-[#E5E5E5] text-[#28272E]"
          onClick={() => navigate('/dashboard')}
        >
          Back to Dashboard
        </button>
      </div>
      <div className="absolute top-8 right-8 z-50">
        <LogoPopover />
      </div>
      <FadeIn>
        <div className="flex flex-col items-center w-full">
          <h1 className="text-7xl font-bold text-[#28272E] mb-2 mt-4 text-center">Profiles</h1>
          <p className="text-2xl text-[#28272E] mb-12 font-normal text-center">Manage all your toasts</p>
          <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
            {profiles.length === 0 ? (
              <div className="col-span-3 text-center text-xl text-[#28272E]">No profiles yet.</div>
            ) : (
              profiles.map((profile) => {
                const initial = profile.name.trim().charAt(0).toUpperCase();
                return (
                  <button
                    className="flex flex-col items-center justify-center rounded-3xl shadow-xl bg-white/70 hover:bg-black/10 focus:bg-black/20 transition p-8 cursor-pointer border-0 outline-none focus:ring-2 focus:ring-[#6092B6]"
                    key={profile.name}
                    style={{ minHeight: 280 }}
                    onClick={() => navigate(`/profile/${encodeURIComponent(profile.name)}`)}
                  >
                    <div
                      className="flex items-center justify-center w-36 h-36 rounded-full mb-6 text-6xl font-bold shadow-inner"
                      style={{
                        backgroundColor: !profile.name.trim()
                          ? '#E3E1DF'
                          : profile.iconColor || '#6092B6',
                        color: profile.name.trim() ? '#FFFDF7' : '#28272E',
                      }}
                    >
                      {initial || '?'}
                    </div>
                    <div className="text-2xl font-bold text-[#28272E] mt-2">{profile.name}</div>
                  </button>
                );
              })
            )}
          </div>
        </div>
      </FadeIn>
    </div>
  );
}