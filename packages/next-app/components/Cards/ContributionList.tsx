import { Box, Text } from "degen";
import { Contribution } from "../../graph/loudverse-graph-types";
import { ethers } from "ethers";
import { toTrimmedAddress } from "../../utils";
import { useContext } from "react";
import { CallContext } from "../FullPageProject";

const ContributionList = ({ contributionList }: { contributionList: Contribution[] }) => {
  const { cffContext } = useContext(CallContext);

  return (
    <Box padding="4" height="max" backgroundColor="foregroundSecondary" borderRadius="medium">
      <Box marginBottom="4">
        <Text size="extraLarge" weight="semiBold">
          Contribution History
        </Text>
      </Box>
      <Box overflow="scroll" height="44">
        {contributionList?.length > 0 ? (
          contributionList.map((contribution, i) => {
            let date;
            if (contribution?.timestamp !== (null || undefined)) {
              date = new Date(contribution.timestamp * 1000).toDateString();
            } else {
              date = new Date().toDateString();
            }

            return (
              <Box key={i} marginBottom="4">
                {/* link to user page <Link
                  href={`/users/${contribution?.user.id}`}
                  passHref
                > */}
                <Box cursor="pointer">
                  <Text>
                    <a href={`https://polygonscan.com/tx/${contribution.txHash}`} target="_blank" rel="noreferrer">
                      {toTrimmedAddress(contribution?.user.id)} funded {ethers.utils.formatEther(contribution?.amount)}{" "}
                      DAI{" "}
                    </a>
                  </Text>
                </Box>
                {/* </Link> */}
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
