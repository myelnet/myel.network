import * as React from 'react';
import {useLayoutEffect, useState} from 'react';
import styles from './Home.module.css';
import NextImage from 'next/image';

import Image from '../components/Image';
import MacWindowIcon from '../components/MacWidowIcon';
import ShippingBoxIcon from '../components/ShippingBoxIcon';
import Head from '../components/Head';
import SegmentedControl from '../components/SegmentedControl';
import ProjectTracker from '../components/ProjectTracker';
import Uploader, {Peer, Content} from '../components/Uploader';
import Retriever from '../components/Retriever';
import LogoIcon from '../components/LogoIcon';
import logoColor from '../public/LogoColor.svg';
import logoBackground from '../public/LogoBackground.svg';
import backroundBlur from '../public/BackgroundBlur.png';
import humanFileSize from '../utils/humanFileSize';

export default function Home() {
  const [mode, setMode] = useState('upload');
  const [peers, setPeers] = useState<Peer[]>([
    {
      id: '12D3KooWStJfAywQmfaVFQDQYr9riDnEFG3VJ3qDGcTidvc4nQtc',
      name: 'ohio.myel.zone',
      latency: 0.738,
    },
    {
      id: '12D3KooWPQTuoHCKQJKNsfJqMbiGn7Ms1RLmqSqVmSVipcmYptrf',
      name: 'simparis.myel.zone',
      latency: 0.891,
    },
    {
      id: '12D3KooWJBZ6peowSj8GExHKqZKEBdNtBbz8AFp6YSnBCpLfJVoo',
      name: 'antibes.myel.zone',
      latency: 0.081,
    },
    {
      id: '12D3KooWLLPFQHmEiF8Qc9XN54P3o7XBkxyL4ucq2p3ruG92J4zr',
      name: 'colenyc.ngrok.io',
      latency: 0.011,
    },
  ]);
  const [content, setContent] = useState<Content[]>([]);
  useLayoutEffect(() => {
    document.body.dataset.theme = 'dark';
  });
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
                        <li key={p.id} className={styles.peerRow}>
                          <div className={styles.peerHeading}>
                            <div>
                              {p.id.slice(0, 8)}...{p.id.slice(-4)}
                            </div>
                            <div>{p.name.split('.')[0]}</div>
                          </div>
                          <div className={styles.peerData}>{p.latency}s</div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={styles.framebottom}>
                    <Uploader
                      peers={peers}
                      onComplete={(added) => setContent(content.concat(added))}
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
