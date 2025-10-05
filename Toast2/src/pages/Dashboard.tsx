import React from 'react';
import { useProfiles } from '@/context/ProfileContext';
import { useNavigate } from 'react-router-dom';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';


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

  // State for popover
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);

  // Helper to check if a date matches any profile's birthday (month and day only)
  function getBirthdaysOnDate(date: Date) {
    return profiles.filter((profile: { birthday: string }) => {
      const [month, day] = profile.birthday.split(' ');
      if (!month || !day) return false;
      const birthdayMonth = new Date(`${month} 1, 2000`).getMonth();
      const birthdayDay = parseInt(day, 10);
      return date.getMonth() === birthdayMonth && date.getDate() === birthdayDay;
    });
  }

  // Precompute a set of unique birthday days (month-day) for all profiles
  const uniqueBirthdayDays = React.useMemo(() => {
    const set = new Set();
    profiles.forEach((profile: { birthday: string }) => {
      const [month, day] = profile.birthday.split(' ');
      if (month && day) {
        set.add(`${month}-${parseInt(day, 10)}`);
      }
    });
    return set;
  }, [profiles]);

  // Modifier: only one dot per unique birthday day
  const birthdayModifier = (date: Date) => {
    // Only one dot per unique birthday per day, regardless of outside days
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate();
    return uniqueBirthdayDays.has(`${month}-${day}`);
  };

  // Handle day click: always set selectedDate, which controls popover
  function handleDayClick(date: Date) {
    if (birthdayModifier(date)) {
      setSelectedDate(date);
    } else {
      setSelectedDate(null);
    }
  }

  // Get unique birthday profiles for selected date
  const birthdayProfiles = selectedDate
    ? Array.from(new Map(getBirthdaysOnDate(selectedDate).map(p => [p.name, p])).values())
    : [];

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
          <Popover open={!!selectedDate} onOpenChange={open => { if (!open) setSelectedDate(null); }}>
            <PopoverTrigger asChild>
              <div>
                <Calendar
                  showOutsideDays={false}
                  modifiers={{ birthday: birthdayModifier }}
                  modifiersClassNames={{ birthday: 'birthday-highlight' }}
                  className="w-full text-lg"
                  onDayClick={handleDayClick}
                />
              </div>
            </PopoverTrigger>
            <PopoverContent align="center" sideOffset={8} className="text-center">
              {birthdayProfiles.length > 0 && (
                <div>
                  {birthdayProfiles.map((profile) => (
                    <div key={profile.name} className="mb-2">
                      <div><b>{profile.name}</b>'s birthday</div>
                      <Button
                        className="mt-2"
                        onClick={() => navigate(`/profile/${encodeURIComponent(profile.name)}`)}
                      >
                        View Profile
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </PopoverContent>
          </Popover>
        </div>
      </div>
      {/* Highlight birthday cells with a background color */}
      <style>{`
        .birthday-highlight {
          background: #C3E6FF !important;
          border-radius: 8px !important;
        }
      `}</style>
    </div>
  );
}
