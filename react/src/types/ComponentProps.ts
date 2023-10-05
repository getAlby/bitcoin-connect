export type ComponentProps = {
  onConnect?(): void;
  onConnecting?(): void;
  onDisconnect?(): void;
  onModalOpened?(): void;
  onModalClosed?(): void;
  appName?: string;
};
