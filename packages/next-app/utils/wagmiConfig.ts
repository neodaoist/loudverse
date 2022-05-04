import { providers } from "ethers";
import { createClient, chain } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

const defaultChain = chain.polygon;

export const client = createClient({
  autoConnect: true,
  connectors: [
    new InjectedConnector({
      chains: [defaultChain],
    }),
    // new MetaMaskConnector({
    //   chains: [defaultChain],
    // }),
    new WalletConnectConnector({
      chains: [defaultChain],
      options: {
        qrcode: true,
      },
    }),
    new CoinbaseWalletConnector({
      chains: [defaultChain],
      options: {
        appName: "LOUDVΞRSΞ",
        chainId: defaultChain.id,
      },
    }),
  ],
  provider(config) {
    return new providers.AlchemyProvider(config.chainId, process.env.ALCHEMY_ID);
  },
});
