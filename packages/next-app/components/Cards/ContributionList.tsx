import React from "react";
import { Box, Tag, Text } from "degen";
import { Contribution } from "../../graph/loudverse-graph-types";
import { ethers } from "ethers";
import { toTrimmedAddress } from "../../utils";
import Link from "next/link";

const ContributionList = ({ contributionList }: { contributionList: Contribution[] }) => {
  return (
    <Box padding="4" backgroundColor="foregroundSecondary" borderRadius="medium">
      <Box marginBottom="4">
        <Text size="extraLarge" weight="semiBold">
          Contribution History
        </Text>
      </Box>
      <Box overflow="scroll" height="24">
        {contributionList?.length > 0 ? (
          contributionList.map((contribution, i) => {
            const date = new Date(contribution?.timestamp * 1000).toDateString().toString();

            return (
              <Box key={i} marginBottom="4">
                <Text>
                  <Link href={`/users/${contribution?.user.id}`} passHref>
                    <a>{toTrimmedAddress(contribution?.user.id)}</a>
                  </Link>{" "}
                  funded {ethers.utils.formatEther(contribution?.amount)} DAI
                </Text>
                <Text size="small">{date}</Text>
              </Box>
            );
          })
        ) : (
          <Box margin="auto">
            <Text align="center">No contributions, yet!</Text>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ContributionList;
