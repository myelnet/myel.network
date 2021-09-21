import * as React from 'react';
import {useLayoutEffect, useState} from 'react';
import styles from './Home.module.css';
import NextImage from 'next/image';
import {useDropzone} from 'react-dropzone';

import Image from '../components/Image';
import MacWindowIcon from '../components/MacWidowIcon';
import ShippingBoxIcon from '../components/ShippingBoxIcon';
import Head from '../components/Head';
import SegmentedControl from '../components/SegmentedControl';
import Modal from '../components/Modal';
import logoColor from '../public/LogoColor.svg';
import logoBlack from '../public/LogoBlack.svg';
import logoBackground from '../public/LogoBackground.svg';
import logoDropper from '../public/LogoDropper.svg';

type Peer = {
  id: string;
  region: string;
  latency: number;
};

export default function Home() {
  const [mode, setMode] = useState('upload');
  const [peers, setPeers] = useState<Peer[]>([
    {
      id: '12D3KooWMETXkWySAajFMqjiq8Q9xwMR8ceBrEAQFh6k8KHLAPNy',
      region: 'ohio',
      latency: 0.738,
    },
    {
      id: '12D3KooWStJfAywQmfaVFQDQYr9riDnEFG3VJ3qDGcTidvc4nQtc',
      region: 'paris',
      latency: 0.891,
    },
  ]);
  useLayoutEffect(() => {
    document.body.dataset.theme = 'dark';
  });
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File>(null);
  const onDrop = (files) => {
    setFile(files[0]);
  };
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});
  const reset = () => {
    setFile(null);
    setUploading(false);
  };

  return (
    <>
      <Head
        title="Myel - Community Powered Content Delivery Network"
        description="Myel is the missing piece for content delivery in the Web 3.0 stack. Myel provides fast, resilient and trustless data transfers for Web 3.0 applications using IPFS and Filecoin protocols."
        currentURL="https://www.myel.network"
      />
      <div className={styles.container}>
        <main className={styles.overviewContainer}>
          <section className={`${styles.section} ${styles.sectionHero}`}>
            <div className={styles.sectionContent}>
              <div className={styles.sectionText}>
                <h1 className={styles.sectionTitle}>myel</h1>
                <p className={styles.sectionSubtitle}>
                  The <strong>community</strong> powered content delivery
                  network for <strong>web3</strong> developers
                </p>
                <button className={styles.btn}>try it out</button>
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
            <h2 className={styles.sectionTitle2}>Try it out!</h2>
            <p className={styles.sectionSubtitle2}>
              You can upload a file to <strong>Myel CDN</strong>, or retrieve an
              existing file stored on our <strong>decentalized network</strong>.
            </p>
            <div className={styles.frameContainer}>
              <div className={styles.frameContent}>
                <div className={styles.frametop}>
                  <div className={styles.frametopHead}>
                    <div className={styles.frametopCorner}>
                      <NextImage src={logoBlack} alt="Myel logo" />
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
                    <p>connected to {peers.length} peers</p>
                  </div>
                </div>
                <div className={styles.framescroll}>
                  <ul className={styles.framescroller}>
                    {peers.map((p) => (
                      <li key={p.id} className={styles.peerRow}>
                        <div className={styles.peerHeading}>
                          <div>
                            {p.id.slice(0, 8)}...{p.id.slice(-4)}
                          </div>
                          <div>{p.region}</div>
                        </div>
                        <div className={styles.peerData}>{p.latency}s</div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={styles.framebottom}>
                  <button
                    className={styles.btn}
                    onClick={() => setUploading(true)}>
                    upload a file
                  </button>
                  <p className={styles.fineprint}>
                    Uploaded files will be public
                  </p>
                </div>
              </div>
            </div>
            <Modal actionTitle="Upload" isOpen={uploading} onDismiss={reset}>
              {file ? (
                <div className={styles.successContainer}>
                  <div className={styles.successContent}>
                    <span className={styles.taglight}>✅ File uploaded</span>
                    <h2>
                      <strong>{file.name}</strong>
                    </h2>
                    <h2>{file.size}</h2>
                    <div className={styles.fineprint}>
                      Your file was recieved by Peer 0012942. It is now cached
                      on the Myel network and can be retrieved from anywhere.
                    </div>
                  </div>
                  <button className={styles.blackBtn} onClick={reset}>
                    dismiss
                  </button>
                </div>
              ) : (
                <div className={styles.dropContainer} {...getRootProps()}>
                  <input {...getInputProps()} />
                  <span className={styles.taglight}>Upload a file</span>
                  <NextImage src={logoDropper} alt="Drag on the logo" />
                  <p className={styles.fineprint}>
                    Drag and drop to upload a file of any size or type
                  </p>
                </div>
              )}
            </Modal>
          </section>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle2}>
              The power of a decentralized CDN
            </h2>
            <p className={styles.sectionSubtitle2}>
              Your users 'host' your app for you, and as more users use your
              app, your infrastructure <strong>scales automatically</strong>.
              They're your backend servers,{' '}
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
                  <li>
                    <span className={styles.listicon}>💪</span>
                    <div className={styles.itemmain}>
                      <h3>Resilience</h3>
                      <p>No single point of failure</p>
                    </div>
                    <button className={styles.btn}>read more</button>
                  </li>
                  <li>
                    <span className={styles.listicon}>🌍</span>
                    <div className={styles.itemmain}>
                      <h3>Scale</h3>
                      <p>$0 to add a node</p>
                    </div>
                    <button className={styles.btn}>read more</button>
                  </li>
                  <li>
                    <span className={styles.listicon}>🏎</span>
                    <div className={styles.itemmain}>
                      <h3>Performance</h3>
                      <p>Pure peer-to-peer client ↔ network connection</p>
                    </div>
                    <button className={styles.btn}>read more</button>
                  </li>
                  <li>
                    <span className={styles.listicon}>🤝</span>
                    <div className={styles.itemmain}>
                      <h3>Ease of use</h3>
                      <p>Thousands of nodes deployed with a single click</p>
                    </div>
                    <button className={styles.btn}>read more</button>
                  </li>
                </ul>
              </div>
            </div>
            <div className={styles.backgroundLogo}>
              <NextImage src={logoBackground} alt="Background logo" />
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
