import * as React from 'react';

import styles from './ActivityIndicator.module.css';

export default function ActivityIndicator() {
  return (
    <div
      className={styles.indicator}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={1}>
      <svg height="100%" viewBox="0 0 32 32" width="100%">
        <circle
          cx="16"
          cy="16"
          fill="none"
          r="14"
          strokeWidth="4"
          stroke="#FF66B9"
          opacity="0.2"
        />
        <circle
          cx="16"
          cy="16"
          fill="none"
          r="14"
          strokeWidth="4"
          stroke="#FF66B9"
          strokeDasharray="80"
          strokeDashoffset="60"
        />
      </svg>
    </div>
  );
}
