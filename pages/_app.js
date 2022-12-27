import "../styles/globals.css";
import Navbar from "../components/Navbar";
import { MoralisProvider } from "react-moralis";
import { LensProvider } from "../context/LensContext";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "../constants/lensConstants";
import Head from "next/head";

function Bubble({ Component, pageProps }) {
  return (
    <MoralisProvider initializeOnMount={false}>
      <ApolloProvider client={apolloClient}>
        <LensProvider>
          <Head>
            <link rel="icon" type="image/ico" href="/images/bubble.ico" />
          </Head>
          <Navbar />
          <Component {...pageProps} />
        </LensProvider>
      </ApolloProvider>
    </MoralisProvider>
  );
}

export default Bubble;
