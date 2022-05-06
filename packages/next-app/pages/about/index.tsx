import type { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { Box, Heading, IconBookOpen, IconEth, IconHand, IconPlug, IconUsersSolid, Text, useTheme } from "degen";
import cookieCutter from "cookie-cutter";
import CtaBar from "../../components/Layout/CtaBar";
import PageWrapper from "../../components/Layout/PageWrapper";
import logoDark from "../../public/loudverse_logo_dark.png";
import logoLight from "../../public/loudverse_logo_light.png";
import { getAllCallsForFunds } from "../../graph/functions";
import { CallForFunding } from "../../graph/loudverse-graph-types";

const Home = ({ calls }: { calls: CallForFunding[] }) => {
  const { mode } = useTheme();
  const divider = <Box borderTopWidth="0.5" borderColor="foregroundTertiary" marginX="40" marginBottom="16"></Box>;

  return (
    <>
      <PageWrapper>
        <CtaBar distAmt="2.7" numOfCreators={calls.length.toString()} isHomePage={true} />
        <Box textAlign="center">
          {/* Banner */}
          <Box marginTop="8">
            <Image src={mode == "light" ? logoDark : logoLight} width="1198" height="82" alt="logo" />
            <Box marginTop="8" marginBottom="16">
              <Heading level="1">Be seen. Be heard. Be experienced.</Heading>
            </Box>
          </Box>

          {/* Three image row */}
          <Box display="flex" justifyContent="space-between" marginBottom="16" backgroundColor="backgroundSecondary">
            <Box textAlign="center" display="flex" flexDirection="column" alignItems="center">
              <IconEth size="48" color="blue" />
              <Heading level="2" color="blue">
                Crowdfunding
              </Heading>
            </Box>
            <Box textAlign="center" display="flex" flexDirection="column" alignItems="center">
              <IconBookOpen size="48" color="green" />
              <Heading level="2" color="green">
                Commissioning
              </Heading>
            </Box>
            <Box textAlign="center" display="flex" flexDirection="column" alignItems="center">
              <IconUsersSolid size="48" color="purple" />
              <Heading level="2" color="purple">
                Community
              </Heading>
            </Box>
          </Box>
          {/* Three paragraphs */}
          <Box marginBottom="8" backgroundColor="backgroundSecondary">
            <Text size="extraLarge">
              <p>
                <strong>LOUDVERSE</strong> is a 2-sided marketplace for funding
                <br />
                hard-to-quantify public goods like music, poetry, and theater.
              </p>
            </Text>
            <Text size="extraLarge">
              <p>
                Key building blocks include crowd-commissions, smart-art,
                <br />
                and a <strong>double-constrained quadratic funding</strong> mechanism.
              </p>
            </Text>
            <Text size="extraLarge">
              <p>
                Crowd-commissions blur lines between fan/creator, analog/digital,
                <br />
                empowering artists to co-create and <strong>ship creative work</strong> with the
                <br />
                Ethereum blockchain in ways never before possible.
              </p>
            </Text>
          </Box>
          {/* Need to get live values in here */}
          {divider}
          {/* Mixed content rows */}
          {/* ETH -> HAND -> PLUG */}
          <Box marginX="auto" marginBottom="16" backgroundColor="backgroundSecondary" maxWidth="screenLg">
            <Box display="flex" marginY="2" justifyContent="center" alignItems="center">
              <IconEth size="24" color="textPrimary" />
              <Box marginLeft="2">
                <Text size="extraLarge" align="left">
                  Web3 is providing creators with more opportunities to fund and monetize their work. But there is still
                  an open design space for funding hard-to-quantify public goods like music, poetry, and theater.
                </Text>
              </Box>
            </Box>
            <Box display="flex" marginY="2" justifyContent="center" alignItems="center">
              <Text size="extraLarge" align="left">
                Crowd-commissioning empowers artists, musicians, and other creators to fund their work in a sustainable
                way while building a deeper relationship with their fans and supporters.
              </Text>

              <IconHand size="24" color="textPrimary" />
            </Box>
            <Box display="flex" marginY="2" justifyContent="center" alignItems="center">
              <IconPlug size="24" color="textPrimary" />
              <Box marginLeft="2">
                <Text size="extraLarge" align="left">
                  A Crowd-Commission is a non-transferrable NFT that represents “proof of patronage.” Smart-Art is an
                  NFT collectible that allows artists and contributors to co-create and share in the financial upside.
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
      </PageWrapper>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const allCalls = await getAllCallsForFunds();
  const cookie = cookieCutter(context.req.headers);

  return {
    props: {
      calls: allCalls,
      mode: cookie.get("mode") || null,
    },
  };
};

export default Home;
