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
        <section className={`${styles.section} ${styles.section2}`}>
          <div className={styles.background}>
            <Image
              alt="background"
              src={GradientBg}
              ratio="sans"
              plh={GradientBgPlh}
              className={styles.backgroundImage}
            />
          </div>
          <article className={styles.article}>
            <header className={styles.articleHeader}>
              <h2>
                The Myel network help developers bring and scale new
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
		  The Hop Exchange allows for any IPFS node to deliver content on the Myel network and get paid.  
		  Under the hood, this plugin and library for go-ipfs connects to a secondary Filecoin retrieval market to
                  serve and retrieve content.
                </p>
                <a href="https://myel.dev/#/blog/intro">
                  Learn more about the Hop exchange
                </a>
              </section>
              <section className={styles.articleItem}>
                <div className={styles.titleRow}>
                  <MacWindowIcon fill="#AB40FF" />
                  <h3>Myel for MacOS</h3>
                </div>
                <p>
                  Become a Myel peer with our clean and simple MacOS application. 
		  The application runs a Hop Exchange node to serve content to whomever requests it and you get paid for every request.
                </p>
                <a href="https://myel.dev/#/blog/intro">
                  Learn more about Myel for MacOS
                </a>
              </section>
              <section className={styles.articleItem}>
                <div className={styles.titleRow}>
                  <ShippingBoxIcon fill="#FB7008" />
                  <h3>myel.js</h3>
                </div>
                <p>
                  Interact with the Myel network in your applications to improve
                  reliability and speed when distributing memory intensive
                  content. 
                </p>
                <a href="https://myel.dev/#/blog/intro">
                  Learn more about myel.js
                </a>
              </section>
            </div>
          </article>
        </section>
      </main>
    </>
  );
}
