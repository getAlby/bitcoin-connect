import '@getalby/lightning-wallet-connect';
import {useAppStore} from '../AppStore';
import {BCLogo} from '../icons/BCLogo';
import {SunIcon, MoonIcon} from '@heroicons/react/24/solid';

export function Header() {
  const store = useAppStore();

  return (
    <div className="flex w-full justify-between items-center max-sm:flex-col max-sm:gap-4">
      <div className="flex gap-4 justify-center items-center">
        <BCLogo />
        <div className="badge badge-outline badge-sm mt-1">1.0.0</div>
      </div>
      <div className="flex justify-end items-center gap-4">
        {/* @ts-ignore */}
        <lwc-button />
        <label className="swap swap-rotate hover:brightness-110 active:scale-95">
          <input
            type="checkbox"
            checked={store.isDarkMode}
            onChange={(event) => store.setDarkMode(event.target.checked)}
          />

          <SunIcon className="swap-on w-8 h-8" />
          <MoonIcon className="swap-off w-8 h-8" />
        </label>
      </div>
    </div>
  );
}
