import {ChevronRightIcon} from '@heroicons/react/24/solid';
import {useAppStore} from './AppStore';
import {Header} from './components/Header';
import '@getalby/lightning-wallet-connect';
import desktopImageUrl from './assets/monitor.png';
import phoneImageUrl from './assets/phone.png';
import zappyBirdImageUrl from './assets/zappy-bird.png';
import {ShowcaseCard} from './components/ShowcaseCard';
import React from 'react';

function App() {
  const isDarkMode = useAppStore((store) => store.isDarkMode);
  const [themeIndex, setThemeIndex] = React.useState(0);

  return (
    <div
      data-theme={isDarkMode ? 'dark' : 'light'}
      className="h-full bg-base-100 p-4 flex items-start justify-center"
    >
      <div className="max-w-4xl flex flex-col items-center gap-8">
        <Header />

        <p className="text-primary text-2xl">
          Access Lightning-Powered Websites on every browser.&nbsp;
          <span className="text-secondary">
            Mobile Browsers, PWAs, Tablets, Desktop Browsers.
          </span>
          &nbsp;No extension needed. No switching to/from your wallet.
        </p>
        <div
          className="flex border border-gray-400 rounded-3xl px-4 w-full items-center justify-center shadow-2xl"
          style={{
            background: `linear-gradient(180deg, #0000 10%, #fff6 100%), linear-gradient(180deg, ${
              isDarkMode ? '#000A, #000A' : '#fffA, #000C'
            }), repeating-conic-gradient(#808080 0% 25%, transparent 0% 50%) 50% / 128px 128px`,
          }}
        >
          <div className="flex items-center justify-center relative overflow-hidden w-[50%]">
            <div
              className="absolute w-full h-full bg-contain bg-no-repeat bg-center z-10"
              style={{backgroundImage: `url(${phoneImageUrl})`}}
            />
            <div className="flex mx-[6%] mb-[0%] mt-[3%] rounded-3xl w-full h-0 pb-[100%] flex-col items-center justify-center relative">
              <video
                autoPlay
                muted
                loop
                controls={false}
                className="absolute top-0 left-0 w-full h-full"
                // onLoadedData={() => setVideoLoaded(true)}
              >
                <source
                  type="video/mp4"
                  src="/lightning-wallet-connect/demo-mobile.mp4"
                />
              </video>
            </div>
          </div>
          <div className="flex items-center justify-center relative overflow-hidden w-[70%]">
            <div
              className="absolute w-full h-full bg-contain bg-no-repeat bg-center z-10"
              style={{backgroundImage: `url(${desktopImageUrl})`}}
            />
            <div className="flex mx-[7.5%] my-[7.5%] rounded-3xl w-full h-0 pb-[90%] flex-col items-center justify-center relative">
              <video
                autoPlay
                muted
                loop
                controls={false}
                className="absolute top-0 left-0 w-full h-full translate-y-[-7%]"
                // onLoadedData={() => setVideoLoaded(true)}
              >
                <source
                  type="video/mp4"
                  src="/lightning-wallet-connect/demo.mp4"
                />
              </video>
            </div>
          </div>
        </div>

        <p className="text-primary text-2xl">
          Bitcoin Connect is an elegantly simple yet powerful library that
          enables users to connect their wallet to lightning-powered websites on
          any browser through the power of{' '}
          <a href="https://webln.guide" target="_blank">
            <span className="link">WebLN</span>
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
        <p className="text-primary text-2xl mt-8">
          Delightful, customizable UI. &nbsp;
          <span className="text-secondary">
            Match your site's theme with only a few CSS variables.
          </span>
        </p>
        <div
          className="flex border border-gray-400 rounded-3xl p-4 w-full h-96 flex-col items-center justify-between shadow-2xl"
          style={{
            background: `linear-gradient(180deg, #0000 10%, #fff6 100%), linear-gradient(180deg, ${
              isDarkMode ? '#000A, #000A' : '#fffA, #fffA'
            }), repeating-conic-gradient(#808080 0% 25%, transparent 0% 50%) 50% / 128px 128px`,
          }}
        >
          <div
            className={`flex-1 flex justify-center items-center theme-${themeIndex}`}
          >
            {/* @ts-ignore */}
            <lwc-button />
          </div>
          <div className="flex gap-4 justify-center item theme p-2 rounded-lg shadow-xl bg-black bg-opacity-30">
            {[...new Array(4)].map((_, index) => (
              <div className={`theme-${index}`} key={index}>
                <div
                  onClick={() => setThemeIndex(index)}
                  className={`rounded-full w-8 h-8 cursor-pointer hover:brightness-110 active:scale-95 transition-all shadow-lg ${
                    themeIndex === index && 'border-2 border-white'
                  }`}
                  style={{
                    background:
                      'linear-gradient(180deg, var(--lwc-color-primary) 0%, var(--lwc-color-secondary) 100%)',
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        <p className="text-primary text-2xl mt-8 text-center">
          Bitcoin Connect
          <br />
          <span className="text-secondary text-lg">In the Wild</span>
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <ShowcaseCard
            title="Zappy Bird"
            url="https://rolznz.github.io/zappy-bird/"
            imageUrl={zappyBirdImageUrl}
          />
          <ShowcaseCard
            title="Make me an Image"
            url="https://make-me-an-image-lwc-version.rolznz.repl.co/"
            imageUrl={
              'https://make-me-an-image-lwc-version.rolznz.repl.co/profile.png'
            }
          />
        </div>

        <h2 className="text-primary text-2xl mt-8 text-center">
          Supported Wallets
        </h2>
        <div className="flex flex-wrap gap-4">
          <p>Alby Extension</p>
          <p>Alby NWC</p>
          <p>Alby NWC (Umbrel)</p>
          <p>NWC (Generic)</p>
          <p>WebLN Browser Extension (Generic)</p>
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
        <p>Made with 💓 by Alby</p>
      </div>
    </div>
  );
}

export default App;
