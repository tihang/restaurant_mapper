import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import Head from "next/head";
import "mapbox-gl/dist/mapbox-gl.css";
import Header from "./../components/Header";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <CSSReset />
      <Head>
        <title>NYC Eatery</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@1,900&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <Header />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
