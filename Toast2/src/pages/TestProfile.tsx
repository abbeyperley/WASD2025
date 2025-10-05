import { useEffect } from 'react';
import { useProfiles } from '@/context/ProfileContext';

export default function TestProfile() {
  const { addProfile } = useProfiles();


  useEffect(() => {
    addProfile({ name: 'Denzil', birthday: 'September 17' });
    addProfile({ name: 'Abbey', birthday: 'February 21' });
    addProfile({ name: 'Winnie', birthday: 'February 8' });
    // eslint-disable-next-line
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-100 via-orange-50 to-blue-200 font-[PP Fragment Text Regular]">
      <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
  <h2 className="text-3xl font-bold mb-4 text-[#28272E]">Test Profiles Added</h2>
  <p className="text-lg text-[#28272E]">Name: <b>Denzil</b> — Birthday: <b>September 17</b></p>
  <p className="text-lg text-[#28272E]">Name: <b>Abbey</b> — Birthday: <b>February 21</b></p>
  <p className="text-lg text-[#28272E]">Name: <b>Winnie</b> — Birthday: <b>February 8</b></p>
      </div>
    </div>
  );
}
