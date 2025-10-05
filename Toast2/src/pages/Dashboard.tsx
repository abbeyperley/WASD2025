import React from 'react';
import { useProfiles } from '@/context/ProfileContext';
import { useNavigate } from 'react-router-dom';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Carousel } from '@/components/ui/carousel';
// Helper: get days until next birthday (ignores year)
function daysUntilBirthday(birthday: string): number {
  const now = new Date();
  const [month, day] = birthday.split(' ');
  if (!month || !day) return Infinity;
  const thisYear = now.getFullYear();
  let bday = new Date(`${month} ${day}, ${thisYear}`);
  if (
    bday.getMonth() < now.getMonth() ||
    (bday.getMonth() === now.getMonth() && bday.getDate() < now.getDate())
  ) {
    bday = new Date(`${month} ${day}, ${thisYear + 1}`);
  }
  const diff = bday.getTime() - now.setHours(0, 0, 0, 0);
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

// Helper: sort profiles by soonest birthday
function getSortedUpcomingBirthdays(profiles: { name: string; birthday: string }[]) {
  return [...profiles]
    .filter(p => p.birthday)
    .sort((a, b) => daysUntilBirthday(a.birthday) - daysUntilBirthday(b.birthday));
}


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

  // Prepare carousel data
  const sortedBirthdays = React.useMemo(() => getSortedUpcomingBirthdays(profiles), [profiles]);

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
        <div className="flex flex-row gap-12 mt-8 w-full">
          {/* Calendar Section */}
          <div className="p-8 rounded-3xl shadow-xl bg-white" style={{ width: '480px', maxWidth: '100%', flexShrink: 0 }}>
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
              <PopoverContent side="right" align="center" sideOffset={8} className="text-center">
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
          {/* Next up... birthday carousel */}
          <div className="flex flex-col items-start justify-start md:mt-0 mt-0">
            <h2 className="text-3xl font-normal mb-4 ml-2">Next up...</h2>
            <div className="rounded-2xl shadow-xl bg-gradient-to-br from-[#5B5B5B] to-[#7A8CB7] p-6 min-w-[320px] max-w-[400px] w-full">
              {sortedBirthdays.length === 0 ? (
                <div className="text-white text-lg">There are no profiles yet.</div>
              ) : (
                <Carousel
                  items={sortedBirthdays}
                  renderItem={(profile) => {
                    const days = daysUntilBirthday(profile.birthday);
                    const [month, day] = profile.birthday.split(' ');
                    return (
                      <button
                        className="w-full text-left focus:outline-none"
                        style={{ background: 'none', border: 'none', padding: 0 }}
                        onClick={() => navigate(`/profile/${encodeURIComponent(profile.name)}`)}
                      >
                        <div className="flex flex-row items-center justify-between">
                          <div>
                            <div className="text-white text-sm font-bold mb-1">{month} {day}</div>
                            <div className="text-white text-3xl font-serif mb-2">{profile.name}</div>
                          </div>
                          <div className="flex flex-col items-center justify-center bg-white/20 rounded-xl px-4 py-2">
                            <div className="text-3xl font-bold text-white">{days}</div>
                            <div className="text-xs text-white font-semibold">more days</div>
                          </div>
                        </div>
                      </button>
                    );
                  }}
                />
              )}
            </div>
        </div>
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
