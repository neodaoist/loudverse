import React from "react";
import { Box, Tag, Text } from "degen";

const ContributionList = ({ contributionList }: { contributionList: TransactionLogType }) => {
  return (
    <Box backgroundColor="foregroundSecondary" padding="4">
      <Box marginBottom="4">
        <Text size="extraLarge">Project Contributions</Text>
      </Box>
      {contributionList.map(contribution => (
        <Box marginBottom="4">
          <Text size="small">{contribution.timestamp}</Text>
          <Text>
            {contribution.funder} funded {contribution.amount} DAI
          </Text>
        </Box>
      ))}
    </Box>
  );
};

export default ContributionList;
