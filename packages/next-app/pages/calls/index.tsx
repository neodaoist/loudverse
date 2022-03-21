import type { GetServerSideProps } from "next";
import { Box, Stack, Text, Heading } from "degen";
import cookieCutter from "cookie-cutter";

import { getAllCallsForFunds } from "../../graph/functions";
import { CallForFunding } from "../../graph/loudverse-graph-types";
import PageWrapper from "../../components/Layout/PageWrapper";
import CtaBar from "../../components/Layout/CtaBar";
import FundingCall from "../../components/Cards/FundingCall";

const Calls = ({ calls }: { calls: CallForFunding[] }) => {
  return (
    <>
      {/* <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head> */}
      <PageWrapper>
        <CtaBar distAmt="2.7" numOfCreators="5" />
        <Box marginBottom="4" marginLeft="4">
          <Heading level="2">Open Calls for Funds</Heading>
        </Box>
        <Stack flex={1} direction="horizontal" space="0" wrap>
          {calls.map((call, i) => {
            if (
              call.id !== "0x4d6ad8dd38dcbb482bd0e4da293dbb77f195ce8d" &&
              call.id !== "0x536ba7da1a7620b4c442877b887acb325d65ed86"
            ) {
              return (
                <Box display="flex" key={`${call.title}-${i}`} width="1/3" padding="4">
                  <FundingCall callForFunding={call} index={i} />
                </Box>
              );
            }
          })}
        </Stack>
      </PageWrapper>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  // const allCalls = await getAllCallsForFunds();
  const cookie = cookieCutter(context.req.headers);
  const allCalls = [
    {
      title: "Solarpunk Strings",
      description: "wellwisher.eth is creating an immersive solarpunk experience with a Western classical twist", // _description
      image: " ", // _image
      category: "music", // _category
      genre: "classical", // _genre
      subgenre: "string quartet", // _subgenre
      timelineInDays: 90, // _timelineInDays
      minFundingAmount: 1, // _minFundingAmount
      deliverableMedium: "mp3", // _deliverableMedium
      lifetimeFundsReceived: 0,
    },
    {
      title: "B is 4 Bufficorn",
      description: "vitalik.eth is commissioning digital art to accompany a children’s storybook", // _description
      image: "https://infura-ipfs.io/ipfs/bafybeiajw4y5t7bw5qzrqjleo4i5lhb6p7or3mesxwsa3s53yetani5qbi", // _image
      category: "digital art", // _category
      genre: "generative art", // _genre
      subgenre: "fractal/algorithmic", // _subgenre
      timelineInDays: 90, // _timelineInDays
      minFundingAmount: 1, // _minFundingAmount
      deliverableMedium: "image/jpeg", // _deliverableMedium
      lifetimeFundsReceived: 0,
    },

    {
      title: "¿Quien Llamo Carlo?", // _title
      description: "carlo-davidoff.eth is producing multilingual synthwave about identity lost and recovered", // _description
      image: "https://infura-ipfs.io/ipfs/bafybeiaxrxtb3p5wyw3kba5domyec77suy5q52hqfy7vpfqzyuajbvytli", // _image
      category: "music", // _category
      genre: "electronic", // _genre
      subgenre: "synthwave", // _subgenre
      timelineInDays: 90, // _timelineInDays
      minFundingAmount: 1, // _minFundingAmount
      deliverableMedium: "audio/mp3",
      lifetimeFundsReceived: 0,
    },

    {
      title: "those WERE the buffigwei we were looking for", // _title
      description: "DroidDetecta42.eth is writing an epic poem that revisits a post-crypto Tatooine", // _description
      image: "https://infura-ipfs.io/ipfs/bafybeiem42ao4uyh3ul47oamchykik4tvjapl4gtoyspyskdjzik7grq4y", // _image
      category: "poetry", // _category
      genre: "fan fiction poetry", // _genre
      subgenre: "Star Wars fan fiction", // _subgenre
      timelineInDays: 90, // _timelineInDays
      minFundingAmount: 1, // _minFundingAmount
      deliverableMedium: "text/pdf",
      lifetimeFundsReceived: 0,
    },

    {
      title: "Tempted from Afar", // _title
      description: "SilverSaraah.eth is reimagining desire in the digital age", // _description
      image: "https://infura-ipfs.io/ipfs/bafkreigaaje35y5fswkz5rssoezq3ribu6mjayf7fxbgfyfue36veimxpq", // _image
      category: "dance", // _category
      genre: "modern dance", // _genre
      subgenre: "interpretive modern dance", // _subgenre
      timelineInDays: 90, // _timelineInDays
      minFundingAmount: 1, // _minFundingAmount
      deliverableMedium: "video/mp4",
      lifetimeFundsReceived: 0,
    }, // _deliverableMedium

    {
      title: "Buff Buffigwei", // _title
      description: "stonelifter.eth is creating immersive animations to tell stories of small becoming big", // _description
      image: "https://infura-ipfs.io/ipfs/bafkreidh6cpdo65dyqot2pfx6glzx4h3z2emrkgtvbhdp7xyjfazycgfky", // _image
      category: "animation", // _category
      genre: "generative animation", // _genre
      subgenre: "dynamic painting", // _subgenre
      timelineInDays: 90, // _timelineInDays
      minFundingAmount: 1, // _minFundingAmount
      deliverableMedium: "video/mp4",
      lifetimeFundsReceived: 0,
    },
  ]; // _deliverableMedium

  return {
    props: {
      calls: allCalls,
      mode: cookie.get("mode") || null,
    },
  };
};

export default Calls;
