import * as React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.topSection}>
          <div>
            <h6>Myel</h6>
            <p>Community powered content delivery network</p>
            <ul>
              <li>
                <Link href="/sign-up">Request access</Link>
              </li>
              <li>
                <a href="https://myel.dev/#/blog">Blog</a>
              </li>
            </ul>
          </div>
          <div>
            <h6>Product</h6>
            <ul>
              <li>
                <a href="https://github.com/myelnet/pop">PoP</a>
              </li>
              <li>Myel for MacOS (coming soon)</li>
              <li>myel.js (coming soon)</li>
            </ul>
          </div>
          <div>
            <h6>Developers</h6>
            <ul>
              <li>
                <a href="https://myel.dev">Docs</a>
              </li>
            </ul>
          </div>
          <div>
            <h6>Contact</h6>
            <ul>
              <li>hello@myel.dev</li>
            </ul>
          </div>
        </div>
        <div className={styles.bottomSection}>
          <div className={styles.border} />
          <div className={styles.copyright}>
            <div>Copyright © 2021 Myel Inc. All rights reserved.</div>
            <div>Planet Earth</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
