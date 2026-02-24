// for a production wallet, visit https://getalby.com/alby-hub
async function createTestLNAddr() {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await fetch('https://faucet.nwc.dev', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const connectionSecret = (await response.text()).trim();

      if (!connectionSecret.startsWith('nostr+walletconnect://')) {
        throw new Error('Invalid connection string format');
      }

      // Safe URL parsing
      const url = new URL(
        connectionSecret.replace('nostr+walletconnect://', 'https://')
      );
      const lud16 = url.searchParams.get('lud16');

      if (!lud16) {
        throw new Error('lud16 parameter missing');
      }

      return lud16;
    } catch (error) {
      if (attempt === 2) {
        throw new Error('Failed to create test wallet after 3 attempts');
      }
      await new Promise((resolve) => setTimeout(resolve, 250 * (attempt + 1)));
      continue;
    }
  }
  throw new Error('Unreachable code path');
}
