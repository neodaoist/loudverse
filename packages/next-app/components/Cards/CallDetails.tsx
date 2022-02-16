import React from "react";
import { Box, Text } from "degen";
import { CallForFunding } from "../../graph/loudverse-graph-types";
import Image from "next/image";

const CallDetails = ({ callForFunding }: { callForFunding: CallForFunding }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      width="1/2"
      backgroundColor="foregroundSecondary"
      borderRadius="medium"
      padding="4"
    >
      <Box marginBottom="4">
        <Text size="extraLarge">{callForFunding.title}</Text>
        <Text>{callForFunding.description}</Text>
      </Box>
      {/* <Image src={callForFunding.image} width="80" height="80" /> */}
      <Box marginBottom="4">
        <Image
          src="https://h7.alamy.com/comp/3/b100b89cf9674374a720da41d50937e3/ejxrme.jpg"
          width="120"
          height="120"
          layout="fixed"
        />
      </Box>
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
