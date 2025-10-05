import React from 'react';

interface ProfileViewProps {
  name: string;
  birthday: string;
  reminderPreference?: string;
  categories?: { [key: string]: string };
  notes?: string;
  readOnly?: boolean;
}

export function ProfileView({ name, birthday, reminderPreference, categories = {}, notes, readOnly = false }: ProfileViewProps) {
  const initial = name.trim().charAt(0).toUpperCase();
  const categoryEntries = Object.entries(categories);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="p-12 shadow-xl rounded-[4rem]" style={{ backgroundColor: '#FFFDF7' }}>
        <div className="flex gap-12 mb-8">
          <div className="flex-shrink-0">
            <div
              className="w-48 h-48 rounded-full flex items-center justify-center text-6xl font-bold"
              style={{ backgroundColor: initial ? '#6092B6' : '#E5E5E5', color: initial ? '#FFFDF7' : '#28272E' }}
            >
              {initial || '?'}
            </div>
          </div>
          <div className="space-y-6 flex-shrink-0" style={{ maxWidth: '500px' }}>
            <div>
              <div
                className="font-bold border-0 px-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                style={{ backgroundColor: 'transparent', color: '#28272E', fontSize: '3rem', height: 'auto', minHeight: '4rem' }}
              >
                {name}
              </div>
            </div>
            <div>
              <div className="font-bold mb-2 block" style={{ color: '#28272E', fontSize: '1.25rem' }}>Birthday</div>
              <div className="flex gap-3">
                <div className="h-14 rounded-2xl text-lg flex items-center px-4" style={{ backgroundColor: '#FFFFFF', color: '#28272E', borderColor: '#E5E5E5', width: '180px' }}>{birthday.split(' ')[0]}</div>
                <div className="h-14 rounded-2xl text-lg flex items-center px-4" style={{ backgroundColor: '#FFFFFF', color: '#28272E', borderColor: '#E5E5E5', width: '100px' }}>{birthday.split(' ')[1]}</div>
              </div>
            </div>
            {reminderPreference && (
              <div>
                <div className="font-bold mb-2 block" style={{ color: '#28272E', fontSize: '1.25rem' }}>Remind me</div>
                <div className="h-14 rounded-2xl text-lg flex items-center px-4" style={{ backgroundColor: '#FFFFFF', color: '#28272E', borderColor: '#E5E5E5', width: '280px' }}>{reminderPreference}</div>
              </div>
            )}
          </div>
        </div>
        <div className={categoryEntries.length === 1 ? 'mb-6' : 'grid grid-cols-2 gap-6 mb-6'}>
          {categoryEntries.map(([categoryName, categoryValue]) => (
            <div key={categoryName} className={categoryEntries.length === 1 ? 'w-full' : ''}>
              <div className="flex items-center justify-between mb-2">
                <div className="font-bold" style={{ color: '#28272E', fontSize: '1.25rem' }}>{categoryName}</div>
              </div>
              <div className="min-h-[150px] rounded-2xl text-lg p-4" style={{ backgroundColor: '#FFFFFF', color: '#28272E', borderColor: '#E5E5E5' }}>{categoryValue}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
