import * as React from 'react';

import styles from './Home.module.css';

/* import PlantsLowres from './assets/plants_lowres.jpg'; */
/* import Plants from './assets/plants.jpg'; */
import Image from './components/Image';
import MyelIcon from './assets/MyelIcon.png';
import MyelIconPlh from './assets/MyelIcon_lowres.png';
import GradientBg from './assets/gradient-bg.jpg';
import GradientBgPlh from './assets/gradient-bg_lowres.png';
import MacWindowIcon from './components/MacWidowIcon';
import ShippingBoxIcon from './components/ShippingBoxIcon';

export default function Home() {
  return (
    <>
      {/*
      <Image
        alt="Plants"
        src={Plants}
        plh={PlantsLowres}
        ratio="sans"
        className={styles.background}
      />
	*/}
      <main className={styles.overviewContainer}>
        <section className={`${styles.section} ${styles.sectionHero}`}>
          <div className={styles.sectionContent}>
            <h1 className={styles.sectionTitle}>
              <div className={styles.logo}>
                <Image
                  alt="Myel icon"
                  src={MyelIcon}
                  ratio="high"
                  plh={MyelIconPlh}
                />
              </div>{' '}
              Myel
            </h1>
            <p className={styles.sectionSubtitle}>
              Community Powered Content Delivery Network.
            </p>
          </div>
        </section>
        <section className={styles.section}>
          <Image
            alt="background"
            src={GradientBg}
            ratio="sans"
            plh={GradientBgPlh}
            className={styles.background}
          />
          <article className={styles.article}>
            <header className={styles.articleHeader}>
              <h2>
                Virtual reality games, video streaming, and other rich content
                require flexible and powerful content delivery tools like never
                before. We help developers bring and scale performant new
                experiences to the entire world without relying on expensive
                server side infrastructures.
              </h2>
            </header>
            <div className={styles.articleBody}>
              <section className={styles.articleItem}>
                <div className={styles.titleRow}>
                  <span>🐸</span>
                  <h3>Hop Exchange</h3>
                </div>
                <p>
                  Speed up content retrieval from Filecoin and get paid for
                  running a Myel node with our plugin and library for go-ipfs.
                  Hop exchange connects to a secondary retrieval market to
                  provide and retrieve content from the fastest peers.
                </p>
                <a href="/">Learn more about the Hop exchange</a>
              </section>
              <section className={styles.articleItem}>
                <div className={styles.titleRow}>
                  <MacWindowIcon fill="#AB40FF" />
                  <h3>Myel for MacOS</h3>
                </div>
                <p>
                  The Myel app operates like any Finder window. You can use it
                  to backup and share files. Content is automatically broken
                  down and persisted across the Myel network. The application
                  runs a Hop exchange node to serve content to whomever requests
                  it and gets paid for every request.
                </p>
                <a href="/">Learn more about Myel for MacOS</a>
              </section>
              <section className={styles.articleItem}>
                <div className={styles.titleRow}>
                  <ShippingBoxIcon fill="#FB7008" />
                  <h3>myel.js</h3>
                </div>
                <p>
                  Interact with the Myel network in your applications to improve
                  reliability and speed when distributing memory intensive
                  content. Our JavaScript client requests users to download the
                  Myel App for better performance but you can also host your own
                  IPFS node with the Hop Exchange plugin.
                </p>
                <a href="/">Learn more about myel.js</a>
              </section>
            </div>
          </article>
        </section>
      </main>
    </>
  );
}
