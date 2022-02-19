import { NFTStorage, File } from "nft.storage";
import { CallForFunding } from "../graph/loudverse-graph-types";
// The 'fs' builtin module on Node.js provides access to the file system
const fs = require("fs");
// The 'path' module provides helpers for manipulating filesystem paths
import path from "path";

const apiKey = process.env.NFT_STORAGE_KEY;

/**
 * A helper to read a file from a location on disk and return a File object.
 * Note that this reads the entire file into memory and should not be used for
 * very large files.
 * @param {string} filePath the path to a file to store
 * @returns {File} a File object containing the file content
 */
async function fileFromPath(filePath) {
  const content = await fs?.promises?.readFile(filePath);
  const type = "image/jpg";
  return new File([content], path.basename(filePath), { type });
}

export const uploadFinalDeliverable = async ({
  callForFunding,
}: {
  callForFunding: CallForFunding;
}): Promise<string> => {
  console.log(`${apiKey}`);
  const client = new NFTStorage({
    token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEQ4ZGYyNTcwMUIzMWI2MjlEODVkNmFiYTI2MDE0ODExQUZBRDI5YTkiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY0NTMwOTcwNjc1OSwibmFtZSI6ImxvdWR2ZXJzZSJ9.61BQoBZL2OVGgHNE-emC8MNyenCkJbe1NXORn3LPkcM`,
  });
  const metadata = await client.store({
    name: `${callForFunding.title}`,
    description: `@wellwisher.eth created a musical solarpunk experience with a Western classical twist, with the help of ${callForFunding.contributions.length}`,
    image: await fileFromPath(`/home/nick/Git/ethdenver/loudverse/packages/next-app/public/call6.jpeg`),
    attributes: [
      {
        trait_type: "Artist",
        value: "neodaoist",
      },

      {
        trait_type: "Collection",
        value: "Guilds v0.1",
      },

      {
        trait_type: "Guild",
        value: "Blacksmiths",
      },
    ],
    created_by: "wellwisher.eth",
    // TODO This should be the JPEG image from the Call for Funds
    image_details: {
      bytes: 271448,
      format: "JPEG",
      sha256: "a6400608932f80d6d0e8fec40371e273f05898e710136bc6f8b91aa5d153966d",
      width: 1600,
      height: 1600,
    },
    properties: {
      image: "https://arweave.net/dOnrsxVEw-cjuGbADVdpybvH91ERi05EXWpdrhqm190",
      image_url: "https://arweave.net/dOnrsxVEw-cjuGbADVdpybvH91ERi05EXWpdrhqm190",
    },

    // TODO This should be the MP3 audio that we upload when delivering the final work
    animation_details: {
      bytes: 1689714,
      format: "MP3",
      duration: 84,
      sha256: "2f7dafe68e6662cced1e126825b777cafa6b4119a24edf60890a4a38285438b1",
    },
    animation: "https://arweave.net/ifM6fYBqnNsh2r2_D8yk4qg63hSV3vsJN6MIj77U7iE",
    animation_url: "https://arweave.net/ifM6fYBqnNsh2r2_D8yk4qg63hSV3vsJN6MIj77U7iE",
  });
  console.log(metadata);

  return metadata.url;
};

export const cffFactoryAddress = "0x146f4d0CB5221E27CB4E85e8e9eeD586b6738A15";

export function toTrimmedAddress(value: string): string {
  if (!value) return "";
  return `${value.substr(0, 6)}…${value.substr(value.length - 4, value.length)}`;
}
