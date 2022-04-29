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

  return `https://infura-ipfs.io/ipfs/${metadata.data.image.href.slice(7)}`;
};

export const uploadFinalDeliverable = async ({
  callForFunding,
  file,
}: {
  callForFunding: CallForFunding;
  file: File;
}): Promise<string> => {
  const client = new NFTStorage({
    token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEQ4ZGYyNTcwMUIzMWI2MjlEODVkNmFiYTI2MDE0ODExQUZBRDI5YTkiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY0NTMwOTcwNjc1OSwibmFtZSI6ImxvdWR2ZXJzZSJ9.61BQoBZL2OVGgHNE-emC8MNyenCkJbe1NXORn3LPkcM`,
  });
  const metadata = await client.store({
    name: `${callForFunding.title}`,
    description: `${callForFunding.description}, with the help of ${callForFunding.contributions.length}`,
    image: file,
  });

  return `https://infura-ipfs.io/ipfs/${metadata.data.image.href.slice(7)}`;
};

export const cffFactoryAddress = "0x6722AE5911f8677cE148ecf1aA962ae432Ab7f26";

export function toTrimmedAddress(value: string): string {
  if (!value) return "";
  return `${value.substr(0, 6)}…${value.substr(value.length - 4, value.length)}`;
}
