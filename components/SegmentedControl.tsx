import {useState} from 'react';
import styles from './SegmentedControl.module.css';

type ControlProps = {
  options: string[];
  value: string;
  onChange: (val: string) => void;
};

function SegmentedControl({options, value, onChange}: ControlProps) {
  const idx = options.indexOf(value);
  return (
    <div className={styles.container}>
      <span
        className={styles.selection}
        style={{
          transform: 'translateX(' + 92 * idx + 'px)',
        }}></span>

      {options.map((opt, index) => (
        <div className={styles.option} key={opt}>
          <input
            type="radio"
            id={opt}
            name="actions"
            value={opt}
            checked={value === opt}
            onChange={(evt) => onChange(opt)}
          />
          <label htmlFor={opt}>
            <span>{opt}</span>
          </label>
        </div>
      ))}
    </div>
  );
}

export default SegmentedControl;
