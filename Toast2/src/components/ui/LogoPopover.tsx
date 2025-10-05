import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import LogoIcon from '@/components/ui/LogoIcon';
import { useNavigate } from 'react-router-dom';

export default function LogoPopover() {
  const navigate = useNavigate();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="rounded-full p-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#6092B6] hover:bg-black/10"
          aria-label="Open menu"
          style={{ background: 'transparent' }}
        >
          <LogoIcon size={44} />
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" sideOffset={12} className="w-56 p-0 rounded-2xl shadow-xl border-0 bg-[#FFFDF7]">
        <div className="flex flex-col divide-y divide-gray-200">
          <button className="py-4 px-6 text-lg text-[#28272E] text-left hover:bg-black/10 transition-colors" tabIndex={0}>Profile</button>
          <button className="py-4 px-6 text-lg text-[#28272E] text-left hover:bg-black/10 transition-colors" tabIndex={0}>Settings</button>
          <button
            className="py-4 px-6 text-lg text-red-500 text-left hover:bg-black/10 transition-colors font-semibold"
            tabIndex={0}
            onClick={() => navigate('/')}
          >
            Log Out
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
