import { Box, Stack, Heading } from "degen";
import CallDetails from "./Cards/CallDetails";
import FundingProgress from "./Cards/FundingProgress";
import ContributionList from "./Cards/ContributionList";
import Video from "./Cards/Video";
import { CallForFunding } from "../graph/loudverse-graph-types";

const FullPageCallDetails = ({ call }: { call: CallForFunding }) => {
  return (
    <>
      <Box marginBottom="4">
        <Heading level="2">Call for Funds</Heading>
      </Box>
      <Box display="flex" height="fit" width="full" marginTop="4">
        <Stack flex={1} justify="stretch" direction="horizontal">
          <CallDetails callForFunding={call} />
          <Stack flex={1} justify="stretch">
            <Video videoUri={call?.videoUri} />
            <FundingProgress callForFunding={call} />
            <ContributionList contributionList={call?.contributions} />
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default FullPageCallDetails;
