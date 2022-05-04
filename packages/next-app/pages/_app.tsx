import "../styles/globals.css";
import type { AppProps } from "next/app";
import { WagmiProvider } from "wagmi";
import { client } from "../utils/wagmiConfig";
import { ThemeProvider } from "degen";
import "degen/styles";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider defaultMode={pageProps.mode || "light"}>
      <WagmiProvider client={client}>
        <Component {...pageProps} />
      </WagmiProvider>
    </ThemeProvider>
  );
}

export default MyApp;
