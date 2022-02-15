import React from "react";
import { Box, Text } from "degen";
import { CallForFunding } from "../../graph/loudverse-graph-types";

const CallDetails = ({ callForFunding }: { callForFunding: CallForFunding }) => {
  return (
    <Box display="flex" flexDirection="column" width="1/2" backgroundColor="foregroundSecondary" padding="4">
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
        <Text variant="large">{callForFunding.deliverableMedium}</Text>
      </Box>
      <Box>
        <Text variant="label">Timeline</Text>
        <Text variant="large">{callForFunding.timelineInDays}</Text>
      </Box>
    </Box>
  );
};

export default CallDetails;
