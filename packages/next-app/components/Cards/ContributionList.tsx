import { Box, Text } from "degen";
import { useEnsName } from "wagmi";
import { Contribution } from "../../graph/loudverse-graph-types";
import { ethers } from "ethers";
import { toTrimmedAddress } from "../../utils";
import { useContext } from "react";
import { CallContext } from "../FullPageProject";

const ContributionList = ({ contributionList }: { contributionList: Contribution[] }) => {
  const { cffContext } = useContext(CallContext);

  const SingleContribution = ({ contribution }): JSX.Element => {
    let date;
    if (contribution?.timestamp !== (null || undefined)) {
      date = new Date(contribution.timestamp * 1000).toDateString();
    } else {
      date = new Date().toDateString();
    }

    let ensOrAddress = toTrimmedAddress(contribution?.user.id);
    // buggy, wont force change to mainnet
    // const { data } = useEnsName({
    //   address: contribution?.user.id,
    //   chainId: 1,
    //   onSuccess(data) {
    //     ensOrAddress = data;
    //   },
    // });

    return (
      <>
        {/* link to user page <Linkhref={`/users/${contribution?.user.id}`}passHref> */}
        <Box cursor="pointer">
          <Text>
            <a href={`https://polygonscan.com/tx/${contribution.txHash}`} target="_blank" rel="noreferrer">
              <u>{ensOrAddress}</u> funded {Number(ethers.utils.formatEther(contribution?.amount)).toLocaleString()} DAI{" "}
            </a>
          </Text>
        </Box>
        {/* </Link> */}
        <Text size="small">{date}</Text>
      </>
    );
  };

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
            return (
              <Box key={i} marginBottom="4">
                <SingleContribution contribution={contribution} />
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
