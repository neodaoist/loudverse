import { Box, Stack, Text } from "degen";
import CallDetails from "./Cards/CallDetails";
import FundingProgress from "./Cards/FundingProgress";
import ContributionList from "./Cards/ContributionList";
import { CallForFunding } from "../graph/loudverse-graph-types";

const FullPageCallDetails = ({ call }: { call: CallForFunding }) => {
  // Dummy data
  // const call = {
  //   logicAddress: "0x1",
  //   minFundingAmount: "100 DAI",
  //   creator: "person1",
  //   title: "Solarpunk Strings",
  //   description: "@wellwisher.eth is creating a musical solarpunk experience with a Western classical twist",
  //   category: "music",
  //   genre: "Classical Music",
  //   subgenre: "String Quartet",
  //   deliverableFormat: "Recording (mp3), Score (pdf)",
  //   timeline: "90 days",
  //   fundingState: "open",
  // };
  // const txLog = [
  //   {
  //     user: { id: "@funder1.eth" },
  //     amount: "100",
  //     timestamp: "Sun Feb 13 2022 20:13:28",
  //   },
  //   {
  //     user: { id: "@funder2.eth" },
  //     amount: "20",
  //     timestamp: "Sun Feb 13 2022 20:13:28",
  //   },
  //   {
  //     user: { id: "@funder3.eth" },
  //     amount: "35",
  //     timestamp: "Sun Feb 13 2022 20:13:28",
  //   },
  // ];

  return (
    <Box display="flex" height="full">
      {/* <Box>First row (connect button, anything else)</Box> */}
      <Stack flex={1} justify="stretch" direction="horizontal">
        <CallDetails callForFunding={call} />
        <Stack flex={1} justify="stretch">
          <FundingProgress callForFunding={call} />
          <ContributionList contributionList={call.contributions} />
          {/* <ContributionList contributionList={call.contributions} /> */}
        </Stack>
      </Stack>
    </Box>
  );
};

export default FullPageCallDetails;
