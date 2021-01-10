import * as React from 'react';
import {useState} from 'react';
import NextButton from './components/NextButton';
import ActivityIndicator from './components/ActivityIndicator';
import styles from './SignUp.module.css';
import fleekStorage from '@fleekhq/fleek-storage-js';

type State = 'idle' | 'sending' | 'success' | 'error';

const credentials = {
  apiKey: process.env.REACT_APP_FLEEK_KEY!,
  apiSecret: process.env.REACT_APP_FLEEK_SECRET!,
};

const FILE_KEY = 'email.json';

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

  const [state, set] = useState<State>('idle');
  const postForm = async () => {
    const payload = {
      email,
      details: desc,
    };
    try {
      const {hash} = await fleekStorage.upload({
        ...credentials,
        key: `${email?.split('@')[0]}-${FILE_KEY}`,
        data: JSON.stringify(payload),
      });
      console.log(hash);
      set('success');
    } catch (e) {
      set('error');
    }
  };
  const submit = () => {
    set('sending');
    postForm();
  };
  return (
    <div className={styles.container}>
      <aside className={styles.aside}>
        <h2 className={styles.title}>Request early access</h2>
        <p className={styles.subtitle}>
          We are starting to onboard providers and developers on the network.
          Drop your email and we'll reach out to get you setup.
        </p>
      </aside>
      {state === 'sending' ? (
        <div className={styles.activityIndicator}>
          <ActivityIndicator />
        </div>
      ) : state === 'success' ? (
        <div className={styles.activityIndicator}>
          <p className={styles.successIndicator}>
            <span role="img" aria-label="Thumbs up">
              👍
            </span>{' '}
            - Thanks we'll be in touch soon!
          </p>
        </div>
      ) : state === 'error' ? (
        <div className={styles.activityIndicator}>
          <p className={styles.errorIndicator}>
            Something went wrong. Please try again.
          </p>
        </div>
      ) : (
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
              What do you want to use Myel for?
            </span>
          </div>
          <div className={styles.actions}>
            <NextButton onClick={submit} disabled={!isValid} />
          </div>
        </form>
      )}
    </div>
  );
}
