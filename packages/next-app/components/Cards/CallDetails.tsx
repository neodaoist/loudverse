import React from "react";
import { Box, Stack, Text } from "degen";
import { CallForFunding } from "../../graph/loudverse-graph-types";
import Image from "next/image";

const CallDetails = ({ callForFunding }: { callForFunding: CallForFunding }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      width="1/2"
      padding="4"
      height="auto"
      alignItems="center"
      backgroundColor="foregroundSecondary"
      borderRadius="medium"
    >
      <Box margin="auto">
        <Box marginBottom="2">
          <Text size="extraLarge" weight="semiBold">
            {callForFunding?.title}
          </Text>
        </Box>
        <Text>{callForFunding?.description}</Text>
      </Box>
      {/* <Image src={callForFunding?.image} width="80" height="80" /> */}
      <Box
        display="flex"
        position="relative"
        width="full"
        margin="4"
        height="full"
        justifyContent="center"
        alignItems="center"
      >
        {callForFunding?.image !== " " && <Image src={callForFunding?.image} layout="fill" objectFit="cover" />}
      </Box>
      <Stack direction="vertical" align="center" space="max">
        <Stack direction="horizontal" align="center">
          <Box margin="auto">
            <Text align="center" variant="label">
              Category
            </Text>
            <Text align="center" variant="large">
              {callForFunding?.category}
            </Text>
          </Box>
          <Box margin="auto">
            <Text align="center" variant="label">
              Genre
            </Text>
            <Text align="center" variant="large">
              {callForFunding?.genre}
            </Text>
          </Box>
          <Box margin="auto">
            <Text align="center" variant="label">
              Subgenre
            </Text>
            <Text align="center" variant="large">
              {callForFunding?.subgenre}
            </Text>
          </Box>
        </Stack>
        <Stack direction="horizontal" align="center">
          <Box margin="auto">
            <Text align="center" variant="label">
              Deliverable
            </Text>
            <Text align="center" variant="large">
              {callForFunding?.deliverableMedium}
            </Text>
          </Box>
          <Box margin="auto">
            <Text align="center" variant="label">
              Minimum funding goal
            </Text>
            <Text align="center" variant="large">
              {callForFunding?.minFundingAmount / 1000000000000000000} DAI
            </Text>
          </Box>
          <Box margin="auto">
            <Text align="center" variant="label">
              Timeline
            </Text>
            <Text align="center" variant="large">
              {callForFunding?.timelineInDays} days
            </Text>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};

export default CallDetails;
