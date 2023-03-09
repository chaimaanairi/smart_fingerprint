import Head from 'next/head'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import  Web3Provider from '../components/web3Provider/web3Provider'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    
     <Head>
        <title>Smart Fingerprint</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" type="image/png" href="images/logoBrain.png" />
      </Head>

      <ToastContainer />
      <Web3Provider>
        <Component {...pageProps} />
      </Web3Provider>

    </>
  )
}

export default MyApp