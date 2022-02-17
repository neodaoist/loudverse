import React from "react";
import { Box, Tag, Text } from "degen";
import { Contribution } from "../../graph/loudverse-graph-types";
import { ethers } from "ethers";

const ContributionList = ({ contributionList }: { contributionList: Contribution[] }) => {
  return (
    <Box backgroundColor="foregroundSecondary" borderRadius="medium" padding="4">
      <Box marginBottom="4">
        <Text size="extraLarge">Project Contributions</Text>
      </Box>
      {contributionList.map((contribution, i) => (
        <Box key={i} marginBottom="4">
          {/* TODO add timestamp to graph schema */}
          <Text size="small">{contribution.timestamp}</Text>
          <Text>
            {contribution.user.id} funded {ethers.utils.formatEther(contribution.amount)} ETH
          </Text>
        </Box>
      ))}
    </Box>
  );
};

export default ContributionList;
