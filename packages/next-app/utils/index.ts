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
  const type = "audio/mpeg";
  return new File([content], path.basename(filePath), { type });
}

export const uploadFile = async ({
  file,
  title,
  desc,
}: {
  file: File;
  title: string;
  desc: string;
}): Promise<string> => {
  const client = new NFTStorage({
    token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEQ4ZGYyNTcwMUIzMWI2MjlEODVkNmFiYTI2MDE0ODExQUZBRDI5YTkiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY0NTMwOTcwNjc1OSwibmFtZSI6ImxvdWR2ZXJzZSJ9.61BQoBZL2OVGgHNE-emC8MNyenCkJbe1NXORn3LPkcM`,
  });

  const metadata = await client.store({
    name: title,
    description: desc,
    image: file,
  });

  console.log(metadata);
  return `https://infura-ipfs.io/ipfs/${metadata.ipnft}`;
};

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
    description: `wellwisher.eth created a musical solarpunk experience with a Western classical twist, with the help of ${callForFunding.contributions.length}`,
    image: await fileFromPath(`/home/nick/Git/ethdenver/loudverse/packages/next-app/public/call6.jpeg`),
    properties: [
      { image: "ipfs://bafkreibjucapj6v6z5droqxq5vujxi472g5mhiyge2i265nd42u62r7mpm" },
      { image_url: "https://infura-ipfs.io/ipfs/bafkreibjucapj6v6z5droqxq5vujxi472g5mhiyge2i265nd42u62r7mpm" },
      {
        animation_details: {
          format: "MP3",
        },
      },
      { animation: "ipfs://bafybeifvp5bsnibcjjolpfa3iouzb3y24mbcennwj56tep56obmpnr3dlq" },
      { animation_url: "https://infura-ipfs.io/ipfs/bafybeifvp5bsnibcjjolpfa3iouzb3y24mbcennwj56tep56obmpnr3dlq" },
      ,
    ],
  });
  console.log(metadata);

  return metadata.url;
};

export const cffFactoryAddress = "0x4D5A1DD170E1BeCA2DB61FabBF01fcb371D8cf38";

export function toTrimmedAddress(value: string): string {
  if (!value) return "";
  return `${value.substr(0, 6)}…${value.substr(value.length - 4, value.length)}`;
}
