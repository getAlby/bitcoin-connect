import {create} from 'zustand';

type AppStore = {
  readonly isDarkMode: boolean;
  setDarkMode(isDarkMode: boolean): void;
};

const defaultIsDarkMode =
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

export const useAppStore = create<AppStore>((set) => ({
  isDarkMode: defaultIsDarkMode,
  setDarkMode: (isDarkMode) => set({isDarkMode}),
}));
