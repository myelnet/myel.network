import * as React from 'react';
import styles from './Home.module.css';

import ActivityIndicator from './components/ActivityIndicator';

export default function PageSkeleton() {
  return (
    <main className={styles.overviewContainer}>
      <section className={`${styles.section} ${styles.sectionHero}`}>
        <div
          className={`${styles.sectionContent} ${styles.sectionPlaceholder}`}>
          <ActivityIndicator />
        </div>
      </section>
    </main>
  );
}
