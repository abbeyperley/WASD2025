import { useState } from 'react';
import { useProfiles } from '@/context/ProfileContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Check, X } from 'lucide-react';

export default function ProfileForm({
  initialProfile,
  onSave,
  isNew = false,
}: {
  initialProfile?: any;
  onSave: (profile: any) => void;
  isNew?: boolean;
}) {
  const [name, setName] = useState(initialProfile?.name || '');
  const [birthday, setBirthday] = useState(
    initialProfile?.birthday
      ? (() => {
          const [month, day] = initialProfile.birthday.split(' ');
          return { month, day };
        })()
      : { month: '', day: '' }
  );
  const [reminderPreference, setReminderPreference] = useState(initialProfile?.reminderPreference || '');
  const [notes, setNotes] = useState(initialProfile?.notes || '');
  const [categories, setCategories] = useState<{ [key: string]: string }>(initialProfile?.categories || { Notes: '' });
  const { categories: globalCategories, addCategory } = useProfiles();
  const [newCategoryName, setNewCategoryName] = useState('');
  const [showCategoryPopover, setShowCategoryPopover] = useState(false);
  const [deletePopover, setDeletePopover] = useState<string | null>(null);

  const handleDone = () => {
    const profileData = {
      name,
      birthday: `${birthday.month} ${birthday.day}`,
      reminderPreference,
      categories,
      notes,
    };
    onSave(profileData);
  };

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      setCategories((prev) => ({ ...prev, [newCategoryName]: '' }));
      addCategory(newCategoryName);
      setNewCategoryName('');
      setShowCategoryPopover(false);
    }
  } 

  const handleDeleteCategory = (categoryName: string) => {
    setCategories((prev) => {
      const newCategories = { ...prev };
      delete newCategories[categoryName];
      return newCategories;
    });
    setDeletePopover(null);
  };

  const initial = name.trim().charAt(0).toUpperCase();
  const categoryEntries = Object.entries(categories);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="p-12 shadow-xl rounded-[4rem] relative" style={{ backgroundColor: '#FFFDF7' }}>
        <div className="absolute top-8 right-8 z-10">
          <Button
            onClick={handleDone}
            className="text-white font-medium rounded-2xl px-8 transition-colors hover:opacity-90"
            style={{ backgroundColor: '#6092B6' }}
          >
            {isNew ? 'Done' : 'Save'}
          </Button>
        </div>
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
              <Input
                type="text"
                placeholder="Type name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="font-bold border-0 px-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                style={{ backgroundColor: 'transparent', color: '#28272E', fontSize: '3rem', height: 'auto', minHeight: '4rem' }}
              />
            </div>
            <div>
              <Label className="font-bold mb-2 block" style={{ color: '#28272E', fontSize: '1.25rem' }}>
                Birthday
              </Label>
              <div className="flex gap-3">
                <Select value={birthday.month} onValueChange={(val) => setBirthday((prev) => ({ ...prev, month: val }))}>
                  <SelectTrigger
                    className="h-14 rounded-2xl text-lg"
                    style={{ backgroundColor: '#FFFFFF', color: birthday.month ? '#28272E' : '#999', borderColor: '#E5E5E5', width: '180px' }}
                  >
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="January">January</SelectItem>
                    <SelectItem value="February">February</SelectItem>
                    <SelectItem value="March">March</SelectItem>
                    <SelectItem value="April">April</SelectItem>
                    <SelectItem value="May">May</SelectItem>
                    <SelectItem value="June">June</SelectItem>
                    <SelectItem value="July">July</SelectItem>
                    <SelectItem value="August">August</SelectItem>
                    <SelectItem value="September">September</SelectItem>
                    <SelectItem value="October">October</SelectItem>
                    <SelectItem value="November">November</SelectItem>
                    <SelectItem value="December">December</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={birthday.day} onValueChange={(val) => setBirthday((prev) => ({ ...prev, day: val }))}>
                  <SelectTrigger
                    className="h-14 rounded-2xl text-lg"
                    style={{ backgroundColor: '#FFFFFF', color: birthday.day ? '#28272E' : '#999', borderColor: '#E5E5E5', width: '100px' }}
                  >
                    <SelectValue placeholder="Day" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                      <SelectItem key={day} value={String(day)}>
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label className="font-bold mb-2 block" style={{ color: '#28272E', fontSize: '1.25rem' }}>
                Remind me
              </Label>
              <Select value={reminderPreference} onValueChange={setReminderPreference}>
                <SelectTrigger
                  className="h-14 rounded-2xl text-lg"
                  style={{ backgroundColor: '#FFFFFF', color: reminderPreference ? '#28272E' : '#999', borderColor: '#E5E5E5', width: '280px' }}
                >
                  <SelectValue placeholder="Select reminder time..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-day">1 day before</SelectItem>
                  <SelectItem value="3-days">3 days before</SelectItem>
                  <SelectItem value="1-week">1 week before</SelectItem>
                  <SelectItem value="2-weeks">2 weeks before</SelectItem>
                  <SelectItem value="3-weeks">3 weeks before</SelectItem>
                  <SelectItem value="1-month">1 month before</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className={categoryEntries.length === 1 ? 'mb-6' : 'grid grid-cols-2 gap-6 mb-6'}>
          {categoryEntries.map(([categoryName, categoryValue]) => (
            <div key={categoryName} className={categoryEntries.length === 1 ? 'w-full' : ''}>
              <div className="flex items-center justify-between mb-2">
                <Label className="font-bold" style={{ color: '#28272E', fontSize: '1.25rem' }}>
                  {categoryName}
                </Label>
                <Popover open={deletePopover === categoryName} onOpenChange={(open) => setDeletePopover(open ? categoryName : null)}>
                  <PopoverTrigger asChild>
                    <button
                      className="p-1 hover:bg-gray-200 rounded transition-colors"
                      style={{ color: '#28272E' }}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-2" style={{ backgroundColor: '#FFFDF7' }}>
                    <button
                      onClick={() => handleDeleteCategory(categoryName)}
                      className="px-4 py-2 text-sm font-medium hover:bg-gray-100 rounded transition-colors"
                      style={{ color: '#ef4444' }}
                    >
                      Delete category
                    </button>
                  </PopoverContent>
                </Popover>
              </div>
              <Textarea
                placeholder={`Add details about ${categoryName.toLowerCase()}...`}
                value={categoryValue}
                onChange={(e) => setCategories((prev) => ({ ...prev, [categoryName]: e.target.value }))}
                className="min-h-[150px] rounded-2xl resize-none text-lg"
                style={{ backgroundColor: '#FFFFFF', color: '#28272E', borderColor: '#E5E5E5' }}
              />
            </div>
          ))}
        </div>
        <Popover open={showCategoryPopover} onOpenChange={setShowCategoryPopover}>
          <PopoverTrigger asChild>
            <Button
              className="text-white font-medium rounded-2xl px-6 transition-colors hover:opacity-90"
              style={{ backgroundColor: '#6092B6' }}
            >
              + Category
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-6 rounded-3xl" style={{ backgroundColor: '#FFFDF7', color: '#28272E' }} align="start">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-4" style={{ color: '#28272E' }}>+ new category</h3>
                <hr className="border-gray-300 mb-4" />
                <div className="flex gap-2">
                  <Input
                    placeholder="Category name..."
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && newCategoryName.trim()) {
                        handleAddCategory();
                      }
                    }}
                    className="h-12 rounded-2xl border-0 flex-1"
                    style={{ backgroundColor: 'transparent', color: '#28272E' }}
                  />
                  <Button
                    onClick={handleAddCategory}
                    disabled={!newCategoryName.trim()}
                    className="h-12 w-12 rounded-2xl p-0 transition-colors hover:opacity-90"
                    style={{ backgroundColor: '#6092B6' }}
                  >
                    <Check className="w-5 h-5 text-white" />
                  </Button>
                </div>
              </div>
              {globalCategories.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: '#28272E' }}>existing category</h3>
                  <div className="space-y-2">
                    {globalCategories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          if (!categories[cat]) {
                            setCategories((prev) => ({ ...prev, [cat]: '' }));
                          }
                          setShowCategoryPopover(false);
                        }}
                        className="w-full text-left px-4 py-2 rounded-xl hover:bg-gray-100 transition-colors"
                        style={{ color: '#28272E' }}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </PopoverContent>
        </Popover>
        {/* Removed duplicate Done button at the bottom */}
      </div>
    </div>
  );
}
