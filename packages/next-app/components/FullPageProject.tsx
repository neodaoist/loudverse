import { createContext, useEffect, useState } from "react";
import { Box, Stack, Heading } from "degen";
import CallDetails from "./Cards/CallDetails";
import FundingProgress from "./Cards/FundingProgress";
import ContributionList from "./Cards/ContributionList";
import Video from "./Cards/Video";
import { CallForFunding } from "../graph/loudverse-graph-types";

type ContextType<S> = { cffContext: S; setCFFContext: React.Dispatch<React.SetStateAction<S>> } | null;

export const CallContext = createContext<ContextType<CallForFunding>>(null);

const FullPageCallDetails = ({ call }: { call: CallForFunding }) => {
  const [cffContext, setCFFContext] = useState(call);

  return (
    <CallContext.Provider value={{ cffContext, setCFFContext }}>
      <Box marginBottom="4">
        <Heading level="2">Call for Funds</Heading>
      </Box>
      <Box display="flex" flexGrow={1} height="auto" width="full" marginTop="4">
        <Stack flex={1} justify="stretch" direction="horizontal">
          <CallDetails callForFunding={call} />
          <Stack flex={1} justify="stretch">
            {call.videoUri !== (" " || "") && <Video videoUri={call?.videoUri} />}
            <FundingProgress callForFunding={call} />
            <ContributionList contributionList={cffContext.contributions} />
          </Stack>
        </Stack>
      </Box>
    </CallContext.Provider>
  );
};

export default FullPageCallDetails;
