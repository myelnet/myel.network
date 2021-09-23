import styles from './Spinner.module.css';

export default function Spinner() {
  return (
    <div className={styles.container} role="progressbar">
      <svg height="100%" viewBox="0 0 32 32" width="100%">
        <circle
          cx="16"
          cy="16"
          fill="none"
          r="14"
          strokeWidth="4"
          style={{
            stroke: '#000',
            opacity: 0.2,
          }}
        />
        <circle
          cx="16"
          cy="16"
          fill="none"
          r="14"
          strokeWidth="4"
          style={{
            stroke: '#000',
            strokeDasharray: 80,
            strokeDashoffset: 60,
          }}
        />
      </svg>
    </div>
  );
}
