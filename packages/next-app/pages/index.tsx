import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import {
  Box,
  Button,
  Heading,
  IconBookOpen,
  IconCollection,
  IconEth,
  IconHand,
  IconPlug,
  IconUsersSolid,
  Text,
  useTheme,
} from "degen";
import CtaBar from "../components/Layout/CtaBar";
import PageWrapper from "../components/Layout/PageWrapper";

const Home: NextPage = () => {
  const divider = <Box borderTopWidth="0.5" borderColor="foregroundTertiary" marginX="40" marginBottom="16"></Box>;
  const { mode } = useTheme();
  return (
    <>
      <Head>
        <title>LOUDVΞRSΞ</title>
        {/* <meta name="description" content="Generated by create next app" /> */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageWrapper>
        <Box textAlign="center">
          {/* Banner */}
          <Box marginTop="8">
            <Image
              src={mode == "light" ? `/../public/loudverse_logo_dark.png` : `/../public/loudverse_logo_light.png`}
              width="1198"
              height="82"
              alt="logo"
            />
            <Box marginY="8">
              <Heading level="1">Be seen. Be heard. Be experienced.</Heading>
            </Box>
          </Box>

          {/* Three image row */}
          <Box display="flex" justifyContent="space-between" marginBottom="16" backgroundColor="backgroundSecondary">
            <Box textAlign="center">
              <IconUsersSolid size="56" color="blue" />
              <Heading level="2" color="blue">
                Crowdfunding
              </Heading>
            </Box>
            <Box textAlign="center">
              <IconBookOpen size="56" color="green" />
              <Heading level="2" color="green">
                Commissioning
              </Heading>
            </Box>
            <Box textAlign="center">
              <IconCollection size="56" color="purple" />
              <Heading level="2" color="purple">
                Credentialing
              </Heading>
            </Box>
          </Box>
          {/* Three paragraphs */}
          <Box marginBottom="8" backgroundColor="backgroundSecondary">
            <Text size="extraLarge">
              <p>
                <strong>LOUDVERSE</strong> is a 2-sided marketplace for funding
                <br />
                hard-to-quantify public goods like art, music, and culture
              </p>
            </Text>
            <Text size="extraLarge">
              <p>
                Key building blocks include streaming money, quadratic funding,
                <br />
                and a new web3 primtive — the <strong>crowd-commission</strong>
              </p>
            </Text>
            <Text size="extraLarge">
              <p>
                Crowd-commissions blur lines between fan/creator, analog/digital,
                <br />
                empowering artists to co-create and ship <strong>creative work</strong> with the
                <br />
                Ethereum blockchain in ways never before possible
              </p>
            </Text>
          </Box>
          {/* Need to get live values in here */}
          <CtaBar distAmt="2.7" numOfCreators="5" isHomePage={true} />
          {divider}
          {/* Mixed content rows */}
          {/* ETH -> HAND -> PLUG */}
          <Box marginX="auto" marginBottom="16" backgroundColor="backgroundSecondary" maxWidth="screenLg">
            <Box display="flex" marginY="2" justifyContent="center" alignItems="center">
              {/* <Image
                src="https://h7.alamy.com/comp/3/b100b89cf9674374a720da41d50937e3/ejxrme.jpg"
                width="240"
                height="240"
              /> */}
              <IconEth size="24" />
              <Text size="extraLarge" align="left">
                Web3 is providing creators with more opportunities to fund and monetize their work. But there is still
                an open design space for funding hard-to-quantify public goods like art and culture.
              </Text>
            </Box>
            <Box display="flex" marginY="2" justifyContent="center" alignItems="center">
              <Text size="extraLarge" align="left">
                Crowd-commissioning empowers artists, musicians, and other creators to fund their work in a sustainable
                way while building a deeper relationship with their fans and supporters.
              </Text>
              {/* <Image
                src="https://h7.alamy.com/comp/3/b100b89cf9674374a720da41d50937e3/ejxrme.jpg"
                width="240"
                height="240"
              /> */}
              <IconHand size="24" />
            </Box>
            <Box display="flex" marginY="2" justifyContent="center" alignItems="center">
              {/* <Image
                src="https://h7.alamy.com/comp/3/b100b89cf9674374a720da41d50937e3/ejxrme.jpg"
                width="240"
                height="240"
              /> */}
              <IconPlug size="24" />
              <Text size="extraLarge" align="left">
                A crowd-commission is an ERC721 NFT that represents “proof of patronage.” In support is an on-chain
                reputation “proof of proficiency” ledger using ERC1238 NTTs as crypto-credentials.
              </Text>
            </Box>
          </Box>
          {divider}
          <Box>
            <Text size="large">© 2022 LOUDVERSE. All rights reserved.</Text>
          </Box>
          {/* <h2>Keeping links for convenience for the moment</h2>
          <Link href="/calls">
            <a>calls</a>
          </Link>
          <Link href="/calls/create">
            <a>create call</a>
          </Link>
          <Link href="/calls/0">
            <a>call 0</a>
          </Link>
          <Link href="/users">
            <a>users</a>
          </Link>
          <Link href="/users/1377">
            <a>user 1377</a>
          </Link> */}
        </Box>
      </PageWrapper>
    </>
  );
};

export default Home;
