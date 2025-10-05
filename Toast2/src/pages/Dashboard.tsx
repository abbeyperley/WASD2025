import React from 'react';
import FadeIn from '@/components/ui/FadeIn';
import { useProfiles } from '@/context/ProfileContext';
import { useNavigate } from 'react-router-dom';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Carousel } from '@/components/ui/carousel';
import LogoPopover from '@/components/ui/LogoPopover';

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
      if (!profile.birthday) return false;
      const bday = birthdayStringToDate(profile.birthday);
      return (
        bday &&
        bday.getMonth() === date.getMonth() &&
        bday.getDate() === date.getDate()
      );
    });
  }

  // For calendar modifiers
  const birthdayModifier = (date: Date) => getBirthdaysOnDate(date).length > 0;
  const birthdayProfiles = selectedDate ? getBirthdaysOnDate(selectedDate) : [];
  const sortedBirthdays = getSortedUpcomingBirthdays(profiles);

  function handleDayClick(date: Date) {
    setSelectedDate(date);
  }

  return (
    <div className="min-h-screen p-8 animated-gradient font-[PP Fragment Text Regular] relative">
      <FadeIn>
        <div className="absolute top-8 right-8 z-50">
          <LogoPopover />
        </div>
        <div className="flex flex-col items-start w-full max-w-7xl mx-auto">
          <h1 className="text-6xl text-[#28272E] leading-tight">
            <span className="font-normal text-5xl">{greeting}</span><br />
            <span className="font-bold">{signupName ? signupName : ''}</span>
          </h1>
          {/* Buttons moved below carousel */}
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
                            className="mt-2 hover:bg-black/10 transition-colors"
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
              <div className="rounded-3xl shadow-2xl bg-gradient-to-br from-[#406080] to-[#6092B6] p-10 min-w-[400px] w-full flex flex-col" style={{minWidth: 400, width: '100%'}}>
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
                          className="w-full text-left focus:outline-none hover:bg-black/20 focus:bg-black/30 transition-colors"
                          style={{ background: 'none', border: 'none', padding: 0 }}
                          onClick={() => navigate(`/profile/${encodeURIComponent(profile.name)}`)}
                        >
                          <div className="flex flex-row items-center justify-between gap-12 w-full">
                            <div className="min-w-0">
                              <div className="text-white text-lg font-bold mb-2">{month} {day}</div>
                              <div className="text-white text-5xl font-serif mb-4 whitespace-nowrap" style={{minWidth: 0}}>{profile.name}</div>
                            </div>
                            <div className="flex flex-col items-center justify-center bg-white/20 rounded-2xl px-7 py-4 flex-shrink-0">
                              <div className="text-5xl font-bold text-white">{days}</div>
                              <div className="text-base text-white font-semibold">more days</div>
                            </div>
                          </div>
                        </button>
                      );
                    }}
                  />
                )}
              </div>
              {/* Buttons now directly below carousel, same column */}
              <div className="flex flex-row gap-4 mt-8">
                <Button
                  className="px-10 py-7 rounded-2xl shadow text-lg font-medium bg-[#6092B6] text-white hover:bg-[#406080] focus:bg-[#406080] transition-all duration-200"
                  onClick={() => navigate('/new-profile')}
                >
                  + new profile
                </Button>
                <Button
                  className="px-10 py-7 rounded-2xl shadow text-lg font-medium bg-[#FFFDF7] text-[#28272E] hover:bg-[#e5e5e5] focus:bg-[#e5e5e5] transition-all duration-200"
                  onClick={() => navigate('/profiles')}
                  variant="secondary"
                >
                  all profiles
                </Button>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
      {/* Fixed-position elephant SVG in the bottom right corner, below all content */}
      <img
        src="/assets/elephant3.svg"
        alt="Elephant"
        style={{
          position: 'fixed',
          right: 0,
          bottom: 0,
          width: '320px',
          height: 'auto',
          zIndex: 0,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
        draggable={false}
      />
      {/* Highlight birthday cells with a background color and force button hover overlays */}
      <style>{`
        .birthday-highlight {
          background: #C3E6FF !important;
          border-radius: 8px !important;
        }
        .animated-gradient {
          background: linear-gradient(120deg, #fbeee6, #e0e7ef, #c3e6ff, #fbeee6, #e0e7ef);
          background-size: 300% 300%;
          animation: gradientMove 16s ease-in-out infinite;
        }
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}
