import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
    // TODO
    // wrap web3 wrapper
    return <Component {...pageProps} />;
}

export default MyApp;
