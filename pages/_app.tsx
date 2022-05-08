import Layout from '../components/Layout';
import Head from 'next/head';
import '../styles/globals.css';
import '../styles/styles.scss';
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <meta name='keywords' content='star wars character study' />

        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css'
        />

        {/* <script src='https://code.jquery.com/jquery-3.6.0.min.js'></script> */}
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
