'use client';

import dynamic from 'next/dynamic';
const Button = dynamic(
  () => import('@getalby/bitcoin-connect-react').then((mod) => mod.Button),
  {
    ssr: false,
  }
);
import React from 'react';

export function BitcoinConnectClientWrapper() {
  return (
    <>
      <Button />
      <button
        onClick={async () => {
          const launchModal = await import(
            '@getalby/bitcoin-connect-react'
          ).then((mod) => mod.launchModal);
          launchModal();
        }}
      >
        Launch modal
      </button>
    </>
  );
}
