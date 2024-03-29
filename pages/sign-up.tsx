import * as React from 'react';
import {useState, useLayoutEffect} from 'react';
import NextButton from '../components/NextButton';
import ActivityIndicator from '../components/ActivityIndicator';
import Head from '../components/Head';
import styles from './SignUp.module.css';

type State = 'idle' | 'sending' | 'success' | 'error';

export default function SignUp() {
  useLayoutEffect(() => {
    document.body.dataset.theme = 'dark';
  });
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
      description: desc,
      'form-name': 'signup-form',
    };
    try {
      await fetch('/', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: Object.keys(payload)
          .map(
            (key) =>
              encodeURIComponent(key) + '=' + encodeURIComponent(payload[key])
          )
          .join('&'),
      });
      set('success');
    } catch (e) {
      set('error');
    }
  };
  const submit = () => {
    set('sending');
    postForm();
    // @ts-ignore
    window.sa_event?.('signup');
  };
  return (
    <>
      <Head
        title="Myel | Sign up"
        description="Myel is a CDN product for decentralized applications. Sign up to get early access when the network launches."
        currentURL="https://wwww.myel.network/sign-up"
      />
      <div className={styles.container}>
        <aside className={styles.aside}>
          <h2 className={styles.title}>Register to run a node</h2>
          <p className={styles.subtitle}>
            We are starting to onboard providers on the network. Drop your email
            and we'll reach out to get you setup. If you just want to stay in
            the loop, that's cool too.
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
          <form className={styles.form} data-netlify="true" name="signup-form">
            <div className={styles.inputElement}>
              <input
                name="email"
                value={email}
                onChange={emailChange}
                className={styles.input}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                autoComplete="off"
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
                Describe your setup, what city are you located in etc.
              </span>
            </div>
            <div className={styles.actions}>
              <NextButton onClick={submit} disabled={!isValid} />
            </div>
          </form>
        )}
      </div>
    </>
  );
}
