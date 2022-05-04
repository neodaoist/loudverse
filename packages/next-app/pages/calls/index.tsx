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
      <PageWrapper>
        <CtaBar distAmt="2.7" numOfCreators="5" />
        <Box marginBottom="4" marginLeft="4">
          <Box marginY="4">
            <Heading level="2">Open Calls for Funds</Heading>
          </Box>
          <Text align="center">
            LOUDVERSE is a 2-sided marketplace for funding hard-to-quantify public goods like music, poetry, and
            theater.
            <br />
            Connect to Polygon Network to contribute to a Call for Funds.
          </Text>
        </Box>
        <Stack flex={1} direction="horizontal" space="0" wrap>
          {calls.map((call, i) => {
            return (
              <Box display="flex" key={`${call.title}-${i}`} width="1/3" padding="4">
                <FundingCall callForFunding={call} index={i} />
              </Box>
            );
          })}
        </Stack>
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

export default Calls;
