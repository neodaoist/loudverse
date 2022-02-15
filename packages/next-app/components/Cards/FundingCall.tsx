import React from "react";
import { Box, Tag, Text } from "degen";
import { CallForFunding } from "../../graph/loudverse-graph-types";
import Image from "next/image";
import { ethers } from "ethers";

const FundingCall = ({ callForFunding }: { callForFunding: CallForFunding }) => {
  return (
    <Box
      width="full"
      display="flex"
      justifyContent="space-between"
      flexDirection="column"
      backgroundColor="foregroundSecondary"
      padding="4"
      borderRadius="medium"
      minHeight="64"
    >
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="baseline">
          <Text size="extraLarge">{callForFunding.title}</Text>
          <Tag tone="accent">{callForFunding.category}</Tag>
        </Box>
        <Text>{callForFunding.description}</Text>
      </Box>
      <Box display="inline-block" position="relative">
        <Image
          src={"https://h7.alamy.com/comp/3/b100b89cf9674374a720da41d50937e3/ejxrme.jpg" ?? callForFunding.image}
          alt="Call For Funding's cover image"
          width="128"
          height="128"
        />
      </Box>
      <Text>
        {`${ethers.utils.parseEther(callForFunding.lifetimeFundsReceived)} ETH funded by ${
          callForFunding.contributions.length
        } people so far.`}
      </Text>
    </Box>
  );
};

export default FundingCall;
