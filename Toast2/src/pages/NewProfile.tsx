import { useState } from 'react';
import ProfileForm from '@/components/profile/ProfileForm';
import { useProfiles } from '@/context/ProfileContext';
import { useNavigate } from 'react-router-dom';

export default function NewProfile() {
  const { addProfile } = useProfiles();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-amber-100 via-orange-50 to-blue-200" style={{ fontFamily: "'PP Fragment Text Regular', sans-serif", color: '#28272E' }}>
      <ProfileForm
        isNew
        onSave={(profile) => {
          addProfile(profile);
          navigate('/profiles');
        }}
      />
    </div>
  );
}