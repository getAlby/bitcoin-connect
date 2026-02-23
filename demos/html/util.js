// for a production wallet, visit https://getalby.com/alby-hub
async function createTestLNAddr() {
  for (let attempt = 0; attempt < 3; attempt++) {
    const response = await fetch('https://faucet.nwc.dev', {
      method: 'POST',
    });

    if (!response.ok) {
      if (attempt < 2) continue;
      throw new Error('Failed to create test wallet');
    }

    const connectionSecret = await response.text();

    const url = new URL(
      connectionSecret.replace('nostr+walletconnect://', 'https://')
    );
    let lud16 = url.searchParams.get('lud16');

    return lud16;
  }
}
