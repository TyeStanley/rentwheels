'use client';

import Sun from '@/components/icons/Sun';
import Moon from '@/components/icons/Moon';
import TinySun from '@/components/icons/TinySun';
import TinyMoon from '@/components/icons/TinyMoon';
import System from '@/components/icons/System';
import { useTheme } from '@/context/ThemeProvider';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const ThemeToggle = () => {
  const { mode, setMode } = useTheme();

  const setTheme = (theme: string) => {
    switch (theme) {
      case 'light':
        setMode('light');
        localStorage.theme = 'light';
        break;
      case 'dark':
        setMode('dark');
        localStorage.theme = 'dark';
        break;
      case 'system':
        if (
          window.matchMedia &&
          window.matchMedia('(prefers-color-scheme: dark)').matches
        ) {
          setMode('dark');
          localStorage.theme = 'dark';
        } else {
          setMode('light');
          localStorage.theme = 'light';
        }
        break;
      default:
        break;
    }
  };

  return (
    <Popover>
      <PopoverTrigger className="flex items-center justify-center">
        {mode === 'light' ? <Sun /> : <Moon />}
      </PopoverTrigger>
      <PopoverContent align="end" className="mt-3">
        <button
          className="flex items-center gap-1"
          onClick={() => setTheme('light')}
        >
          <div className="flex size-5 items-center justify-center">
            <TinySun />
          </div>
          <span className="text-sm font-semibold text-primary dark:text-ps100 lg:text-base">
            Light
          </span>
        </button>

        <button
          className="mt-3 flex items-center gap-1"
          onClick={() => setTheme('dark')}
        >
          <div className="flex size-5 items-center justify-center">
            <TinyMoon />
          </div>
          <span className="text-sm font-semibold text-gray400 dark:text-primary lg:text-base">
            Dark
          </span>
        </button>

        <button
          className="mt-3 flex items-center gap-1"
          onClick={() => setTheme('system')}
        >
          <div className="flex size-5 items-center justify-center">
            <System />
          </div>
          <span className="text-sm font-semibold text-gray400 dark:text-ps100 lg:text-base">
            System
          </span>
        </button>
      </PopoverContent>
    </Popover>
  );
};

export default ThemeToggle;
