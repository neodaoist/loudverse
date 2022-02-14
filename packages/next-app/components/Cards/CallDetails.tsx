import React from "react";
import { Box, Tag, Text } from "degen";

const CallDetails = ({ callForFunding }: { callForFunding: CallForFundsGraphType }) => {
  return (
    <Box backgroundColor="foregroundSecondary" padding="4">
      <Text size="extraLarge">{callForFunding.title}</Text>
      <Text>{callForFunding.description}</Text>
      <Box>[Image]</Box>
      <Box>
        <Text variant="label">Category</Text>
        <Text variant="large">{callForFunding.category}</Text>
      </Box>
      <Box>
        <Text variant="label">Genre</Text>
        <Text variant="large">{callForFunding.genre}</Text>
      </Box>
      <Box>
        <Text variant="label">Subgenre</Text>
        <Text variant="large">{callForFunding.subgenre}</Text>
      </Box>
      <Box>
        <Text variant="label">Deliverable</Text>
        <Text variant="large">{callForFunding.deliverableFormat}</Text>
      </Box>
      <Box>
        <Text variant="label">Timeline</Text>
        <Text variant="large">{callForFunding.timeline}</Text>
      </Box>
    </Box>
  );
};

export default CallDetails;
