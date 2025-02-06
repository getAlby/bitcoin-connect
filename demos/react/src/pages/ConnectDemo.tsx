import {Connect} from '@getalby/bitcoin-connect-react';
import toast, {Toaster} from 'react-hot-toast';

export default function ConnectDemo() {
  return (
    <div>
      <h2>Connect Demo</h2>
      <Toaster />
      <Connect
        onConnected={(provider) => {
          console.log('WebLN connected', provider);
          toast('Connected!');
        }}
        onConnecting={() => toast('Connecting!')}
        onDisconnected={() => toast('Disconnected!')}
        onModalOpened={() => toast('Modal opened!')}
        onModalClosed={() => toast('Modal closed!')}
      />
    </div>
  );
}
