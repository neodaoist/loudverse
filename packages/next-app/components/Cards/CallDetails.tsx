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
      <Box width="full">
        <Box marginTop="2" marginBottom="2">
          <Text size="extraLarge" weight="semiBold">
            {callForFunding?.title}
          </Text>
        </Box>
        <Text>{callForFunding?.description}</Text>
      </Box>
      {callForFunding?.image !== " " && (
        <Box
          display="flex"
          position="relative"
          width="full"
          margin="4"
          height="viewHeight"
          maxHeight="44"
          justifyContent="center"
          alignItems="center"
        >
          <Image src={callForFunding?.image} layout="fill" objectFit="contain" alt="Cover Photo" />
        </Box>
      )}
      <Box width="full" textAlign="left">
        <Box marginBottom="4">
          <Text variant="label">Category</Text>
          <Text variant="large">{callForFunding?.category}</Text>
        </Box>
        <Box marginBottom="4">
          <Text variant="label">Genre</Text>
          <Text variant="large">{callForFunding?.genre}</Text>
        </Box>
        <Box marginBottom="4">
          <Text variant="label">Subgenre</Text>
          <Text variant="large">{callForFunding?.subgenre}</Text>
        </Box>
        <Box marginBottom="4">
          <Text variant="label">Deliverable</Text>
          <Text variant="large">{callForFunding?.deliverableMedium}</Text>
        </Box>
        <Box marginBottom="4">
          <Text variant="label">Minimum funding goal</Text>
          <Text variant="large">{callForFunding?.minFundingAmount / 1000000000000000000} DAI</Text>
        </Box>
        <Box>
          <Text variant="label">Timeline</Text>
          <Text variant="large">{callForFunding?.timelineInDays} days</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default CallDetails;
