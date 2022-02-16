import Link from "next/link";
import { Box, Button, Text } from "degen";

const CtaBar = ({ distAmt, numOfCreators }) => {
  return (
    <Box
      height="16"
      paddingX="12"
      paddingY="4"
      display="flex"
      alignItems="center"
      justifyContent="space-around"
      borderColor="black"
      borderWidth="0.375"
      marginBottom="16"
    >
      <Link href="/calls" passHref={true}>
        <Box as="a">
          <Text>
            More than {distAmt} ETH will be distributed to {numOfCreators} creators this month. Join LOUDVERSE today to
            start creating!
          </Text>
        </Box>
      </Link>
      <Button size="small">Open App</Button>
    </Box>
  );
};

export default CtaBar;
