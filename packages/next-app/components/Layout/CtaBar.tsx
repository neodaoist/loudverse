import Link from "next/link";
import { Box, Button, Text } from "degen";

const CtaBar = ({
  distAmt,
  numOfCreators,
  isHomePage,
  isConnected,
}: {
  distAmt: string;
  numOfCreators: string;
  isHomePage?: boolean;
  isConnected?: boolean;
}) => {
  let button;
  if (isHomePage) {
    button = <Button size="small">Open App</Button>;
  } else if (isConnected) {
    button = <Button size="small">Post call for funds</Button>;
  } else {
    button = <Button size="small">Connect</Button>;
  }

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
      {button}
    </Box>
  );
};

export default CtaBar;
