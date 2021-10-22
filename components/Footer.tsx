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
            <p>Content delivery network for the web3.0</p>
            <ul>
              <li>
                <Link href="/sign-up">run a node</Link>
              </li>
              <li>
                <Link href="/blog">
                  <a>blog</a>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h6>Product</h6>
            <ul>
              <li>
                <a href="https://github.com/myelnet/pop">pop</a>
              </li>
              <li>
                <a href="https://github.com/myelnet/myel.js">myel.js</a>
              </li>
            </ul>
          </div>
          <div>
            <h6>Developers</h6>
            <ul>
              <li>
                <a href="https://myel.dev">docs</a>
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
