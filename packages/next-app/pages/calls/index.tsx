import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { Box, Stack, Text } from "degen";

import { getAllCallsForFunds } from "../../graph/functions";
import { CallForFunding } from "../../graph/loudverse-graph-types";
import CenterColumn from "../../components/Layout/CenterColumn";
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
      <CenterColumn>
        <PageWrapper>
          <CtaBar distAmt="2.7" numOfCreators="5" />
          <Box marginBottom="8">
            <Text align="center" size="headingTwo">
              Open calls for funds
            </Text>
          </Box>
          <Stack flex={1} direction="horizontal" space="0" wrap>
            {calls.map(call => (
              <Box display="flex" key={call.title} width="1/3" padding="4">
                <FundingCall callForFunding={call} />
              </Box>
            ))}
          </Stack>
        </PageWrapper>
      </CenterColumn>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const allCalls = await getAllCallsForFunds();

  return {
    props: {
      calls: allCalls,
    },
  };
};

export default Calls;
