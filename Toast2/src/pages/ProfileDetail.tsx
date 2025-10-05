
import { useParams, useNavigate } from 'react-router-dom';
import { useProfiles } from '@/context/ProfileContext';
import ProfileForm from '@/components/profile/ProfileForm';

export default function ProfileDetail() {
  const { name } = useParams<{ name: string }>();
  const { profiles, updateProfile } = useProfiles();
  const navigate = useNavigate();
  const profile = profiles.find(p => p.name === name);

  if (!profile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-amber-100 via-orange-50 to-blue-200">
        <h1 className="text-4xl font-bold mb-4 text-[#28272E]">Profile Not Found</h1>
        <button className="mt-4 px-6 py-2 rounded-xl bg-[#6092B6] text-white text-lg" onClick={() => navigate('/profiles')}>Back to Profiles</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-amber-100 via-orange-50 to-blue-200 flex flex-col">
      <ProfileForm
        initialProfile={profile}
        onSave={(updated) => {
          updateProfile(profile.name, updated);
          navigate('/profiles');
        }}
      />
      <div className="flex justify-center mt-8">
        <button className="px-6 py-2 rounded-xl bg-[#6092B6] text-white text-lg" onClick={() => navigate('/profiles')}>Back to Profiles</button>
      </div>
    </div>
  );
}
