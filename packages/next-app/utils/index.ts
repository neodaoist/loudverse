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
  const client = new NFTStorage({
    token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEQ4ZGYyNTcwMUIzMWI2MjlEODVkNmFiYTI2MDE0ODExQUZBRDI5YTkiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY0NTMwOTcwNjc1OSwibmFtZSI6ImxvdWR2ZXJzZSJ9.61BQoBZL2OVGgHNE-emC8MNyenCkJbe1NXORn3LPkcM`,
  });
  const metadata = await client.store({
    name: `${callForFunding.title}`,
    description: `@wellwisher.eth created a musical solarpunk experience with a Western classical twist, with the help of ${callForFunding.contributions.length}`,
    image: await fileFromPath(`/home/nick/Git/ethdenver/loudverse/packages/next-app/public/call6.jpeg`),
    properties: [
      { image: "https://arweave.net/dOnrsxVEw-cjuGbADVdpybvH91ERi05EXWpdrhqm190" },
      { image_url: "https://arweave.net/dOnrsxVEw-cjuGbADVdpybvH91ERi05EXWpdrhqm190" },
      {
        animation_details: {
          format: "MP3",
        },
      },
      { animation: "https://arweave.net/ifM6fYBqnNsh2r2_D8yk4qg63hSV3vsJN6MIj77U7iE" },
      { animation_url: "https://arweave.net/ifM6fYBqnNsh2r2_D8yk4qg63hSV3vsJN6MIj77U7iE" },
      ,
    ],
  });
  console.log(metadata);

  return metadata.url;
};

export const cffFactoryAddress = "0xa5639DE1299EFdd061cB9a68F2440e19161455f2";

export function toTrimmedAddress(value: string): string {
  if (!value) return "";
  return `${value.substr(0, 6)}…${value.substr(value.length - 4, value.length)}`;
}
