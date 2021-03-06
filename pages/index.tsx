import * as React from 'react';
import {useLayoutEffect} from 'react';
import styles from './Home.module.css';

import Image from '../components/Image';
import MacWindowIcon from '../components/MacWidowIcon';
import ShippingBoxIcon from '../components/ShippingBoxIcon';
import Head from '../components/Head';

export default function Home() {
  useLayoutEffect(() => {
    document.body.dataset.theme = 'dark';
  });
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
              <h1 className={styles.sectionTitle}>
                <div className={styles.logo}>
                  <Image
                    alt="Myel icon"
                    src="/MyelIcon.png"
                    ratio="high"
                    plh="/MyelIcon_lowres.png"
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
                src="/gradient-bg.jpg"
                ratio="sans"
                plh="/gradient-bg_lowres.png"
                className={styles.backgroundImage}
              />
            </div>
            <article className={styles.article}>
              <header className={styles.articleHeader}>
                <h2>
                  We help developers deploy and scale new experiences to the
                  entire world without relying on expensive server side
                  infrastructure.
                </h2>
              </header>
              <div className={styles.articleBody}>
                <section className={styles.articleItem}>
                  <div className={styles.titleRow}>
                    <span>🍿</span>
                    <h3>POP</h3>
                  </div>
                  <p>
                    Run a Myel point of presence and get paid to deliver content
                    on Filecoin and IPFS. With distributions for MacOS and
                    Linux, the Pop command line interface allows developers to
                    publish and retrieve content from a network of cache
                    providers.
                  </p>
                  <a href="/blog/tech-update-1">Learn more about POP</a>
                </section>
                <section className={styles.articleItem}>
                  <div className={styles.titleRow}>
                    <MacWindowIcon fill="#AB40FF" />
                    <h3>Myel for MacOS</h3>
                  </div>
                  <p>
                    Manage your Myel point of presence with our simple MacOS
                    application. The application runs a Pop node to serve
                    content to whomever requests it and gets paid for every
                    request.
                  </p>
                  <a href="/blog/intro">Learn more about Myel for MacOS</a>
                </section>
                <section className={styles.articleItem}>
                  <div className={styles.titleRow}>
                    <ShippingBoxIcon fill="#FB7008" />
                    <h3>myel.js</h3>
                  </div>
                  <p>
                    Interact with the Myel network in your applications to
                    improve reliability and speed when distributing memory
                    intensive content.
                  </p>
                  <a href="/blog/intro">Learn more about myel.js</a>
                </section>
              </div>
            </article>
          </section>
        </main>
      </div>
    </>
  );
}
