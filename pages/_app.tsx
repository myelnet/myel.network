import {AppProps} from 'next/app';
import Head from 'next/head';
import './index.css';
import Footer from '../components/Footer';
import Nav from '../components/Nav';

export default function App({Component, pageProps}: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
      </Head>
      <Nav />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
