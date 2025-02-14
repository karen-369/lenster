import { MoonIcon, SunIcon } from '@heroicons/react/outline';
import { SYSTEM } from '@lenster/data/tracking';
import { PostHog } from '@lib/posthog';
import { Trans } from '@lingui/macro';
import clsx from 'clsx';
import { useTheme } from 'next-themes';
import type { FC } from 'react';

interface ThemeSwitchProps {
  onClick?: () => void;
  className?: string;
}

const ThemeSwitch: FC<ThemeSwitchProps> = ({ onClick, className = '' }) => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      type="button"
      className={clsx(
        'flex w-full px-4 py-1.5 text-sm text-gray-700 dark:text-gray-200',
        className
      )}
      onClick={() => {
        setTheme(theme === 'light' ? 'dark' : 'light');
        PostHog.track(SYSTEM.SWITCH_THEME, {
          mode: theme === 'light' ? 'dark' : 'light'
        });
        onClick?.();
      }}
    >
      <div className="flex items-center space-x-1.5">
        {theme === 'light' ? (
          <>
            <MoonIcon className="h-4 w-4" />
            <div>
              <Trans>Dark mode</Trans>
            </div>
          </>
        ) : (
          <>
            <SunIcon className="h-4 w-4" />
            <div>
              <Trans>Light mode</Trans>
            </div>
          </>
        )}
      </div>
    </button>
  );
};

export default ThemeSwitch;
