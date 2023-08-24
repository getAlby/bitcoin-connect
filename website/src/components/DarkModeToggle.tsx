import {useAppStore} from '../AppStore';
import {SunIcon, MoonIcon} from '@heroicons/react/24/solid';

export function DarkModeToggle() {
  const store = useAppStore();
  return (
    <label className="swap swap-rotate hover:brightness-110 active:scale-95">
      <input
        type="checkbox"
        checked={store.isDarkMode}
        onChange={(event) => store.setDarkMode(event.target.checked)}
      />

      <SunIcon className="swap-on w-8 h-8" />
      <MoonIcon className="swap-off w-8 h-8" />
    </label>
  );
}
