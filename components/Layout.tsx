import * as React from 'react';
import Link from 'next/link';
import styles from './Layout.module.css';

type Props = {
  title?: string;
  subtitle?: string;
  small?: boolean;
  children: React.ReactNode;
};

export default function Layout({children, title, subtitle, small}: Props) {
  return (
    <div className={styles.container}>
      {!!title && (
        <section
          className={[styles.header, small && styles.headerSmall].join(' ')}>
          {small ? (
            <h2>
              <Link href="/blog">
                <a>{title}</a>
              </Link>
            </h2>
          ) : (
            <h1>{title}</h1>
          )}
          {subtitle && <h4>{subtitle}</h4>}
        </section>
      )}
      {children}
    </div>
  );
}
