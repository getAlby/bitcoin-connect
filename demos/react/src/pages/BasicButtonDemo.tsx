import React from 'react';
import {Button} from '@getalby/bitcoin-connect-react';
import toast, {Toaster} from 'react-hot-toast';

export default function BasicButtonDemo() {
  return (
    <div>
      <h2>Basic Button Demo</h2>
      <Toaster />
      <Button
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
