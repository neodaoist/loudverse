import React from "react";
import { Box, Tag, Text } from "degen";
import { CallForFunding } from "../../graph/loudverse-graph-types";
import Image from "next/image";
import { ethers } from "ethers";
import Link from "next/link";

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
        minHeight="64"
        // onClick={() => router.push(`/calls/${callForFunding?.id}`)}
        // onClick={() => router.push(`/calls/${index}`)}
        cursor="pointer"
      >
        <Box>
          <Box display="flex" justifyContent="space-between" alignItems="baseline">
            <Text size="extraLarge">{callForFunding?.title}</Text>
            <Text transform="lowercase">
              <Tag tone={categoryColor()}>{callForFunding?.category}</Tag>
            </Text>
          </Box>
          <Text>{callForFunding?.description}</Text>
        </Box>
        <Box display="inline-block" marginX="auto" justifyContent="center" position="relative">
          <Image
            src={"https://h7.alamy.com/comp/3/b100b89cf9674374a720da41d50937e3/ejxrme.jpg" ?? callForFunding?.image}
            alt="Call For Funding's cover image"
            width="128"
            height="128"
          />
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
