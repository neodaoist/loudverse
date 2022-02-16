import Link from "next/link";
import { Box, Button, Text } from "degen";
import Wallet from "./Wallet";
import { ReactElement } from "react";

const CtaBar = ({
  distAmt,
  numOfCreators,
  isHomePage,
}: {
  distAmt: string;
  numOfCreators: string;
  isHomePage?: boolean;
  isConnected?: boolean;
}) => {
  let button: ReactElement;
  if (isHomePage) {
    button = (
      <Link href="/calls">
        <Button size="small">Open App</Button>
      </Link>
    );
  } else {
    button = <Wallet isCallsCta={true} />;
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
      <Text>
        More than {distAmt} ETH will be distributed to {numOfCreators} creators this month. Join LOUDVERSE today to
        start creating!
      </Text>
      {button}
    </Box>
  );
};

export default CtaBar;