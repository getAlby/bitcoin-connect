import '@getalby/lightning-wallet-connect';
import {BCLogo} from '../icons/BCLogo';
import {DarkModeToggle} from './DarkModeToggle';

export function Header() {
  return (
    <div className="flex w-full justify-between items-center max-sm:flex-col max-sm:gap-4">
      <div className="flex gap-4 justify-center items-center">
        <BCLogo />
        <div className="badge badge-outline badge-sm mt-1">1.0.0</div>
      </div>
      <div className="flex justify-end items-center gap-4">
        {/* @ts-ignore */}
        <lwc-button />
        <DarkModeToggle />
      </div>
    </div>
  );
}
