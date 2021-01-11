import * as React from 'react';
import styles from './Home.module.css';

export default function PageSkeleton() {
  return (
    <main className={styles.overviewContainer}>
      <section className={`${styles.section} ${styles.sectionHero}`}>
        <div className={styles.sectionContent}></div>
      </section>
    </main>
  );
}
