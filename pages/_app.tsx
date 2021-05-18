import {AppProps} from 'next/app';
import Head from 'next/head';
import './index.css';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

export default function App({Component, pageProps}: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Myel is a community powered content delivery network"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Myel" />
        <meta property="og:site_name" content="Myel" />
        <meta property="og:url" content="https://www.myel.network" />
        <meta property="og:image" content="/myel_icon_412x412.ong" />
        <meta
          property="og:description"
          content="Myel is a community powered content delivery network. Download the MacOS app or add the plugin to your IPFS node."
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="canonical" href="https://myel.network" />
        <title>Myel</title>
      </Head>
      <Nav />
      <div className="App">
        <Component {...pageProps} />
      </div>
      <Footer />
    </>
  );
}
