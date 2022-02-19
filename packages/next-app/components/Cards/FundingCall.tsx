import React from "react";
import { Box, Tag, Text } from "degen";
import { CallForFunding } from "../../graph/loudverse-graph-types";
import Image from "next/image";
import { ethers } from "ethers";
import Link from "next/link";
import { toTrimmedAddress } from "../../utils";

const FundingCall = ({ callForFunding, index }: { callForFunding: CallForFunding; index: number }) => {
  const categoryColor = () => {
    switch (index) {
      case 0:
        return "blue";
      case 1:
        return "green";
      case 2:
        return "pink";
      case 3:
        return "purple";
      case 4:
        return "red";

      default:
        return "blue";
    }
  };
  return (
    <Link href={`/calls/${index}`} passHref>
      <Box
        as="a"
        width="full"
        display="flex"
        justifyContent="space-between"
        flexDirection="column"
        backgroundColor="foregroundSecondary"
        padding="4"
        borderRadius="medium"
        minHeight="96"
        // onClick={() => router.push(`/calls/${callForFunding?.id}`)}
        // onClick={() => router.push(`/calls/${index}`)}
        cursor="pointer"
      >
        <Box>
          <Box display="flex" justifyContent="space-between" alignItems="baseline" marginY="2">
            <Text size="extraLarge">{callForFunding?.title}</Text>
            <Tag tone={categoryColor()}>{callForFunding?.category}</Tag>
          </Box>
          <Text>{callForFunding?.description}</Text>
          {/* <Text align="center" variant="label">
            Created by: {toTrimmedAddress(callForFunding?.creator.id)}
          </Text> */}
        </Box>
        <Box
          marginX="auto"
          justifyContent="center"
          marginY="2"
          display="flex"
          position="relative"
          width="full"
          margin="4"
          height="full"
          alignItems="center"
        >
          <Image src={callForFunding?.image} alt="Call For Funding's cover image" layout="fill" objectFit="cover" />
        </Box>
        <Text>
          {`${Number(ethers.utils.formatEther(callForFunding?.lifetimeFundsReceived)).toFixed(3)} ETH funded by ${
            callForFunding?.contributions.length
          } people so far.`}
        </Text>
      </Box>
    </Link>
  );
};

export default FundingCall;
