import {ChevronRightIcon} from '@heroicons/react/20/solid';
import {useAppStore} from './AppStore';
import {Header} from './components/Header';
import '@getalby/lightning-wallet-connect';

function App() {
  const isDarkMode = useAppStore((store) => store.isDarkMode);

  return (
    <div
      data-theme={isDarkMode ? 'dark' : 'light'}
      className="h-full bg-base-100 p-4 flex items-start justify-center"
    >
      <div className="max-w-4xl flex flex-col items-center gap-8">
        <Header />
        <div
          className="flex border border-gray-400 rounded-3xl w-full flex-col items-center justify-center relative overflow-hidden shadow-2xl"
          // style={{
          //   background: `linear-gradient(180deg, #0000 10%, #fff6 100%), linear-gradient(180deg, ${
          //     isDarkMode ? '#000A, #000A' : '#fffA, #fffA'
          //   }), repeating-conic-gradient(#808080 0% 25%, transparent 0% 50%) 50% / 128px 128px`,
          // }}
        >
          <video autoPlay muted loop controls={false} className="rounded-3xl">
            <source
              type="video/mp4"
              src="https://endtest-videos.s3-us-west-2.amazonaws.com/documentation/endtest_data_driven_testing_csv.mp4"
            />
          </video>
        </div>
        <p className="text-primary text-2xl">
          <span className="font-semibold">Bitcoin Connect</span> is an elegantly
          simple yet powerful library that enables users to connect their wallet
          to lightning-powered websites on any browser through{' '}
          <a href="https://webln.guide" target="_blank">
            <span className="font-semibold">WebLN</span>
          </a>
          , the open protocol for Lightning on the Web. &nbsp;
          <span className="text-secondary">
            Designed with both developers and end users in mind, it is easy to
            integrate and customize, bringing to life a sleek and unique
            experience.
          </span>
        </p>
        <a
          className="self-start"
          href="https://github.com/getAlby/lightning-wallet-connect"
          target="_blank"
        >
          <button className="btn">
            View the docs
            <ChevronRightIcon className="h-6 w-6 text-secondary" />
          </button>
        </a>
        <p className="text-primary text-2xl">
          Delightful, customizable UI. &nbsp;
          <span className="text-secondary">
            Match your site's theme with only a few CSS variables.
          </span>
        </p>
        <div
          className="flex border border-gray-400 rounded-3xl p-4 w-full h-96 flex-col items-center justify-center shadow-2xl"
          style={{
            background: `linear-gradient(180deg, #0000 10%, #fff6 100%), linear-gradient(180deg, ${
              isDarkMode ? '#000A, #000A' : '#fffA, #fffA'
            }), repeating-conic-gradient(#808080 0% 25%, transparent 0% 50%) 50% / 128px 128px`,
          }}
        >
          {/* @ts-ignore */}
          <lwc-button />
        </div>

        <p className="text-primary text-2xl mt-8">
          Bitcoin Connect&nbsp;
          <span className="text-secondary">In the Wild</span>
        </p>
        <div className="flex flex-wrap gap-4">
          <div
            className="flex border border-gray-400 rounded-3xl p-4 w-64 h-48 flex-col items-center justify-center shadow-2xl bg-cover bg-center"
            style={{background: 'url(/zappy-bird.png)'}}
          ></div>
        </div>

        <p>
          Bitcoin ipsum dolor sit amet. Public key soft fork fee market
          electronic cash Satoshi Nakamoto blockchain, block height, space
          citadel! UTXO few understand this sats stacking sats timestamp server,
          inputs cryptocurrency. Double-spend problem cryptocurrency I'm in it
          for the tech mining electronic cash proof-of-work electronic cash
          genesis block. Private key mempool freefall together miner money
          printer go brrrrr mempool private key wallet. Sats stacking sats
          transaction address! Freefall together hodl inputs public key hodl
          double-spend problem, genesis block. Block height blockchain block
          reward hard fork SHA-256 Merkle Tree full node decentralized.
          Blocksize transaction whitepaper UTXO, when lambo cryptocurrency hard
          fork satoshis? To the moon outputs blockchain hashrate, decentralized.
          Hard fork, electronic cash full node sats mining cryptocurrency, hodl.
          Mempool blocksize deflationary monetary policy Merkle Tree satoshis
          fee market when lambo mempool. Transaction peer-to-peer money printer
          go brrrrr few understand this soft fork volatility fee market block
          height. Block reward, private key deflationary monetary policy, block
          height pizza to the moon cryptocurrency! SHA-256 digital signature
          halvening full node difficulty, UTXO sats. Halvening private key
          blocksize key pair UTXO block height hashrate inputs! Private key
          whitepaper genesis block hyperbitcoinization block reward mempool UTXO
          private key! I'm in it for the tech to the moon block reward full node
          private key decentralized, inputs genesis block SHA-256? Inputs
          timestamp server volatility hashrate timestamp server, space citadel.
          Inputs private key wallet, whitepaper, UTXO nonce Bitcoin Improvement
          Proposal SHA-256. Price action Bitcoin Improvement Proposal address
          nonce outputs consensus, block reward sats! Block height timestamp
          server SHA-256 freefall together public key, halvening nonce?
        </p>
      </div>
    </div>
  );
}

export default App;
