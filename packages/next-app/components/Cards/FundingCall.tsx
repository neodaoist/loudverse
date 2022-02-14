import React from "react";
import { Box, Tag, Text } from "degen";

const FundingCall = ({ callForFunding }: { callForFunding: CallForFundsGraphType }) => {
  return (
    <Box backgroundColor="foregroundSecondary" padding="4" borderRadius="medium" width="112" height="64">
      <Box display="flex" justifyContent="space-between" alignItems="baseline">
        <Text size="extraLarge">{callForFunding.title}</Text>
        <Tag tone="accent">{callForFunding.category}</Tag>
      </Box>
      <Text>{callForFunding.description}</Text>
      <Box>[Image]</Box>
      <Text>$X funded by Y people so far</Text>
    </Box>
    // Still need:
    // image
    // stats
  );
};

export default FundingCall;
