import "../styles/globals.css";
import { useEffect } from "react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import * as gtag from "../utils/gtag";
import { WagmiProvider } from "wagmi";
import { client } from "../utils/wagmiConfig";
import { ThemeProvider } from "degen";
import "degen/styles";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <ThemeProvider defaultMode={pageProps.mode || "light"}>
      <WagmiProvider client={client}>
        <Component {...pageProps} />
      </WagmiProvider>
    </ThemeProvider>
  );
}

export default MyApp;
