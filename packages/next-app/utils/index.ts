import { NFTStorage, File } from "nft.storage";

const apiKey = process.env.NFT_STORAGE_KEY;
const client = new NFTStorage({ token: apiKey });
const uploadNFT = async (): Promise<string> => {
  const metadata = await client.store({
    name: "Pinpie",
    description: "Pin is not delicious beef!",
    image: new File(
      [
        /* data */
      ],
      "pinpie.jpg",
      { type: "image/jpg" },
    ),
  });

  return metadata.url;
};

export const cffFactoryAddress = "0x39145F0d3060A3dE9b7600a3a1BeA1a1F1e994A1";

export function toTrimmedAddress(value: string): string {
  if (!value) return "";
  return `${value.substr(0, 6)}…${value.substr(value.length - 4, value.length)}`;
}
