import React from 'react';
import { useProfiles } from '@/context/ProfileContext';
import { useNavigate } from 'react-router-dom';
import { Calendar } from '@/components/ui/calendar';

// Helper to convert 'Month Day' (e.g., 'February 8') to a JS Date for the current year
function birthdayStringToDate(birthday: string): Date | null {
  const [month, day] = birthday.split(' ');
  if (!month || !day) return null;
  const year = new Date().getFullYear();
  return new Date(`${month} ${day}, ${year}`);
}


function getGreeting() {
  const now = new Date();
  const hour = now.getHours();
  if (hour >= 5 && hour < 12) return 'Good morning,';
  if (hour >= 12 && hour < 17) return 'Good afternoon,';
  return 'Good evening,';
}

export default function Dashboard() {

  const { signupName, profiles } = useProfiles();
  const greeting = getGreeting();
  const navigate = useNavigate();
  // Debug: log profiles to verify data
  console.log('profiles:', profiles);


  // Helper to check if a date matches any profile's birthday (month and day only)
  function isBirthday(date: Date) {
    return profiles.some((profile: { birthday: string }) => {
      const [month, day] = profile.birthday.split(' ');
      if (!month || !day) return false;
      const birthdayMonth = new Date(`${month} 1, 2000`).getMonth();
      const birthdayDay = parseInt(day, 10);
      return date.getMonth() === birthdayMonth && date.getDate() === birthdayDay;
    });
  }

  // Custom modifier for birthdays (works for any year)
  const birthdayModifier = (date: Date) => isBirthday(date);

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-amber-100 via-orange-50 to-blue-200 font-[PP Fragment Text Regular]">
      <div className="flex flex-col items-start">
        <h1 className="text-6xl font-bold text-[#28272E] leading-tight">
          {greeting}<br />
          {signupName ? signupName : ''}
        </h1>
        <button
          className="mt-6 px-8 py-3 rounded-2xl shadow text-lg font-medium transition-colors"
          style={{ backgroundColor: '#FFFDF7', color: '#28272E' }}
          onClick={() => navigate('/new-profile')}
        >
          + new profile
        </button>
        <div className="mt-8 p-8 rounded-3xl shadow-xl bg-white" style={{ width: '480px', maxWidth: '100%' }}>
          <Calendar
            modifiers={{ birthday: birthdayModifier }}
            modifiersClassNames={{ birthday: 'birthday-highlight' }}
            className="w-full text-lg"
          />
        </div>
      </div>
      {/* Add this style for the birthday highlight as a dot below the date */}
      <style>{`
        .birthday-highlight {
          position: relative;
          background-color: transparent !important;
        }
        .birthday-highlight::after {
          content: '';
          display: block;
          margin: 0 auto;
          width: 0.5em;
          height: 0.5em;
          border-radius: 50%;
          background: #6092B6;
          margin-top: 0.25em;
        }
      `}</style>
    </div>
  );
}
