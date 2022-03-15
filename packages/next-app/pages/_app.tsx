import "../styles/globals.css";
import type { AppProps } from "next/app";
import { WagmiProvider } from "wagmi";
import { ThemeProvider } from "degen";
import "degen/styles";

function MyApp({ Component, pageProps }: AppProps) {
  console.log("pageProps", pageProps);
  return (
    <ThemeProvider defaultMode={pageProps.mode}>
      <WagmiProvider>
        <Component {...pageProps} />
      </WagmiProvider>
    </ThemeProvider>
  );
}

export default MyApp;
