import * as React from 'react';

import styles from './Home.module.css';

import PlantsLowres from './assets/plants_lowres.jpg';
import Plants from './assets/plants.jpg';
import Image from './components/Image';
import MyelIcon from './assets/MyelIcon.png';
import GradientBg from './assets/gradient-bg.jpg';

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
                <Image alt="Myel icon" src={MyelIcon} ratio="high" />
              </div>{' '}
              Myel
            </h1>
            <p className={styles.sectionSubtitle}>
              Earn crypto. Power the world's first decentralized content
              delivery network.
            </p>
          </div>
        </section>
        <section className={styles.section}>
          <Image
            alt="background"
            src={GradientBg}
            ratio="sans"
            className={styles.background}
          />
          <article className={styles.article}>
            <header className={styles.articleHeader}>
              <h2>
                Myel leverages the sharing economy to deliver the world's
                information. All you have to do is keep the app running on your
                computer. You get a share of the entire network's retrieval
                deals revenues.
              </h2>
            </header>
            <div className={styles.articleBody}>
              <section className={styles.articleItem}>
                <h3>🐸 Hop Exchange</h3>
                <p>
                  Myel is a tool not a service. Once you have the app and an
                  internet connection, nothing can stop you from accessing the
                  network. We build our software for longevity. If our
                  organisation went to disapear, you should still be able to use
                  it.
                </p>
              </section>
              <section className={styles.articleItem}>
                <h3>Run it.</h3>
                <p>
                  The Myel app opens like any Finder window. You can upload and
                  access your files in a simple and robust interface. Content is
                  automatically broken down and persisted across the network. In
                  the background the app serves content to whomever requests it
                  and you get paid for every request.
                </p>
              </section>
              <section className={styles.articleItem}>
                <h3>Forget it.</h3>
                <p>
                  As the app optimizes usage of your available local storage,
                  you will automatically earn some revenues. Nothing can shut it
                  down. There is no central point of failure.
                </p>
              </section>
            </div>
          </article>
        </section>
      </main>
    </>
  );
}
