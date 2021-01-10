import * as React from 'react';
import {useState} from 'react';
import NextButton from './components/NextButton';
import styles from './SignUp.module.css';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [desc, setDesc] = useState('');
  const [descFocused, setDescFocused] = useState(false);
  const emailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const descChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDesc(e.target.value);
  };
  const isValid = !!email && !!desc;
  return (
    <div className={styles.container}>
      <aside className={styles.aside}>
        <h2 className={styles.title}>Request early access</h2>
        <p className={styles.subtitle}>
          We are starting to onboard small groups of believers. Drop your email
          and we'll reach out to get you setup in person.
        </p>
      </aside>

      <form className={styles.form}>
        <div className={styles.inputElement}>
          <input
            name="email"
            value={email}
            onChange={emailChange}
            className={styles.input}
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
          />
          <span
            className={
              styles.formLabel +
              (emailFocused || !!email ? ' ' + styles.labelMinimized : '')
            }
            aria-hidden="true">
            Email
          </span>
        </div>
        <div className={styles.inputElement}>
          <textarea
            name="description"
            value={desc}
            onChange={descChange}
            className={styles.input + ' ' + styles.longInput}
            onFocus={() => setDescFocused(true)}
            onBlur={() => setDescFocused(false)}
          />
          <span
            className={
              styles.formLabel +
              (descFocused || !!desc ? ' ' + styles.labelMinimized : '')
            }>
            Why do you want to use Space?
          </span>
        </div>
        <div className={styles.actions}>
          <NextButton onClick={() => {}} />
        </div>
      </form>
    </div>
  );
}
