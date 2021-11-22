import * as React from 'react';
import {useLayoutEffect, useState, useEffect} from 'react';
import styles from './Home.module.css';
import NextImage from 'next/image';
import useSWR from 'swr';

import Image from '../components/Image';
import MacWindowIcon from '../components/MacWidowIcon';
import ShippingBoxIcon from '../components/ShippingBoxIcon';
import Head from '../components/Head';
import SegmentedControl from '../components/SegmentedControl';
import ProjectTracker from '../components/ProjectTracker';
import Uploader, {Peer, Content} from '../components/Uploader';
import Retriever from '../components/Retriever';
import LogoIcon from '../components/LogoIcon';
import PeerRow from '../components/PeerRow';
import logoColor from '../public/LogoColor.svg';
import logoBackground from '../public/LogoBackground.svg';
import backroundBlur from '../public/BackgroundBlur.png';
import ipfsLogo from '../public/ipfs@2x.png';
import ipfsLogoGlow from '../public/ipfs-blur.png';
import ipldLogo from '../public/ipld@2x.png';
import ipldLogoGlow from '../public/ipld-blur.png';
import libp2pLogo from '../public/libp2p@2x.png';
import libp2pLogoGlow from '../public/libp2p-blur.png';
import filecoinLogo from '../public/filecoin@2x.png';
import filecoinLogoGlow from '../public/filecoin-blur.png';
import humanFileSize from '../utils/humanFileSize';
import usePeers from '../utils/usePeers';

const cfFetcher = (path: string) => {
  const url = 'https://routing.myel.workers.dev/' + path;
  return fetch(url).then((res) => res.json());
};

export default function Home() {
  const [mode, setMode] = useState('upload');
  const {data: deferred = []} = useSWR('list', cfFetcher);
  const [content, setContent] = useState<Content[]>([]);
  const {peers, selected, selectPeer, selectedPeers} = usePeers({ping: true});

  useEffect(() => {
    const records: Content[] = deferred?.map((def, i) => {
      return {
        cid: def.k.split(':')[0],
        size: def.s,
        peer: def.v,
      };
    });
    if (records.length > 0) {
      setContent(records);
    }
  }, [deferred]);
  return (
    <>
      <Head
        title="Myel - Community Powered Content Delivery Network for Web 3.0"
        description="Myel is the missing piece for content delivery in the Web 3.0 stack. Myel provides fast, resilient and trustless data transfers for Web 3.0 applications using IPFS and Filecoin protocols."
        currentURL="https://www.myel.network"
      />
      <main className={styles.overviewContainer}>
        <section className={`${styles.section} ${styles.sectionHero}`}>
          <div className={styles.sectionContent}>
            <div className={styles.sectionText}>
              <h1 className={styles.sectionTitle}>myel</h1>
              <p className={styles.sectionSubtitle}>
                The <strong>community</strong> powered content delivery network
                for <strong>web3</strong> developers
              </p>
              <a className={styles.btn} href="#try">
                try it out
              </a>
            </div>
            <div className={styles.liveLogo}>
              <NextImage src={logoColor} alt="Myel logo" />
            </div>
          </div>
        </section>
        <section className={styles.section}>
          <span className={styles.tag}>what is it?</span>
          <h2 className={styles.headline}>
            Myel is a <strong>content delivery</strong> network that is{' '}
            <strong>resilient</strong>, <strong>scalable</strong>, and{' '}
            <strong>peer-to-peer</strong> to suit the long-term needs of{' '}
            <strong>web3</strong> applications.
          </h2>
        </section>
        <section className={styles.section}>
          <span className={styles.tag}>powered by</span>
          <div className={styles.logobox}>
            <a
              href="https://filecoin.io"
              target="_blank"
              className={styles.logoLink}>
              <figure className={styles.logoFig}>
                <div className={styles.logoGlow} aria-hidden="true">
                  <NextImage src={filecoinLogoGlow} alt="Filecoin logo" />
                </div>

                <NextImage
                  src={filecoinLogo}
                  alt="Filecoin logo"
                  className={styles.logoImg}
                />
                <div className={styles.logoLabel}>Filecoin</div>
              </figure>
            </a>
            <a
              href="https://ipfs.io"
              target="_blank"
              className={styles.logoLink}>
              <figure className={styles.logoFig}>
                <div className={styles.logoGlow} aria-hidden="true">
                  <NextImage src={ipfsLogoGlow} alt="IPFS logo" />
                </div>

                <NextImage
                  src={ipfsLogo}
                  alt="IPFS Logo"
                  className={styles.logoImg}
                />
                <div className={styles.logoLabel}>IPFS</div>
              </figure>
            </a>
            <a
              href="https://ipld.io"
              target="_blank"
              className={styles.logoLink}>
              <figure className={styles.logoFig}>
                <div className={styles.logoGlow} aria-hidden="true">
                  <NextImage src={ipldLogoGlow} alt="IPLD logo" />
                </div>

                <NextImage
                  src={ipldLogo}
                  alt="IPLD Logo"
                  className={styles.logoImg}
                />
                <div className={styles.logoLabel}>IPLD</div>
              </figure>
            </a>
            <a
              href="https://libp2p.io"
              target="_blank"
              className={styles.logoLink}>
              <figure className={styles.logoFig}>
                <div className={styles.logoGlow} aria-hidden="true">
                  <NextImage src={libp2pLogoGlow} alt="Libp2p logo" />
                </div>

                <NextImage
                  src={libp2pLogo}
                  alt="Libp2p logo"
                  className={styles.logoImg}
                />
                <div className={styles.logoLabel}>Libp2p</div>
              </figure>
            </a>
          </div>
        </section>
        <section className={styles.section} id="try">
          <h2 className={styles.sectionTitle2}>Try it out!</h2>
          <p className={styles.sectionSubtitle2}>
            You can upload a file to <strong>Myel CDN</strong>, or retrieve an
            existing file stored on our <strong>decentralized network</strong>.
          </p>
          <div className={styles.frameContainer}>
            <div className={styles.frameContent}>
              <div className={styles.frametop}>
                <div className={styles.frametopHead}>
                  <div className={styles.frametopCorner}>
                    <LogoIcon />
                  </div>
                  <div className={styles.frametopCenter}>
                    <SegmentedControl
                      value={mode}
                      onChange={setMode}
                      options={['upload', 'retrieve']}
                    />
                  </div>
                  <div className={styles.frametopCorner}></div>
                </div>
                <div className={styles.frametopTitle}>
                  {mode === 'upload' ? (
                    <p>connected to {peers.length} peers</p>
                  ) : (
                    <p>Select a file to retrieve</p>
                  )}
                </div>
              </div>
              {mode === 'upload' ? (
                <>
                  <div className={styles.framescroll}>
                    <ul className={styles.framescroller}>
                      {peers.map((p) => (
                        <PeerRow
                          key={p.id}
                          {...p}
                          selected={selected[p.id]}
                          onSelect={selectPeer}
                        />
                      ))}
                    </ul>
                  </div>
                  <div className={styles.framebottom}>
                    <Uploader
                      peers={selectedPeers}
                      onComplete={(added) => {
                        setContent(content.concat(added));
                        setMode('retrieve');
                      }}
                    />
                  </div>
                </>
              ) : (
                <Retriever peers={peers} content={content} />
              )}
            </div>
          </div>
          <div className={styles.framebackground}>
            <NextImage
              src={backroundBlur}
              alt="blur"
              height={1200}
              width={1200}
            />
          </div>
        </section>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle2}>
            The power of a decentralized CDN
          </h2>
          <p className={styles.sectionSubtitle2}>
            Your users 'host' your app for you, and as more users use your app,
            your infrastructure <strong>scales automatically</strong>. They're
            your backend servers,{' '}
            <strong>
              your content delivery points of presence, and your customers all
              wrapped in one
            </strong>
            .
          </p>
          <div className={styles.frameContainer}>
            <div className={styles.frameContent}>
              <div className={styles.frametop}>
                <div className={styles.tagspace}>
                  <span className={styles.taglight}>we're striving for</span>
                </div>
              </div>
              <ul className={styles.framelist}>
                <li className={styles.framelistitem}>
                  <span className={styles.listicon}>💪</span>
                  <div className={styles.itemmain}>
                    <h3>Resilience</h3>
                    <p>No single point of failure</p>
                  </div>
                  <a className={styles.btn} href="/blog" target="_blank">
                    read more
                  </a>
                </li>
                <li className={styles.framelistitem}>
                  <span className={styles.listicon}>🌍</span>
                  <div className={styles.itemmain}>
                    <h3>Scale</h3>
                    <p>$0 to add a node</p>
                  </div>
                  <a className={styles.btn} href="/blog" target="_blank">
                    read more
                  </a>
                </li>
                <li className={styles.framelistitem}>
                  <span className={styles.listicon}>🏎</span>
                  <div className={styles.itemmain}>
                    <h3>Performance</h3>
                    <p>Pure peer-to-peer client ↔ network connection</p>
                  </div>
                  <a className={styles.btn} href="/blog" target="_blank">
                    read more
                  </a>
                </li>
                <li className={styles.framelistitem}>
                  <span className={styles.listicon}>🤝</span>
                  <div className={styles.itemmain}>
                    <h3>Ease of use</h3>
                    <p>Thousands of nodes deployed with a single click</p>
                  </div>
                  <a className={styles.btn} href="/blog" target="_blank">
                    read more
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.backgroundLogo}>
            <NextImage src={logoBackground} alt="Background logo" />
          </div>
          <div className={styles.framebackground2}>
            <NextImage
              src={backroundBlur}
              alt="blur"
              height={1200}
              width={1200}
            />
          </div>
        </section>
        <section className={styles.section}>
          <span className={styles.tag}>what we're up to</span>
          <h2 className={styles.sectionTitle2}>roadmap</h2>
          <p className={styles.sectionSubtitle2}>
            Keep tabs on Myel by seeing what’s being worked on now and whats up
            next.
          </p>
          <div className={styles.frameContainer}>
            <ProjectTracker />
          </div>
          <div className={styles.framebackground2}>
            <NextImage
              src={backroundBlur}
              alt="blur"
              height={1200}
              width={1200}
            />
          </div>
        </section>
      </main>
    </>
  );
}
