import { Box, Text } from "degen";
import Link from "next/link";
import Wallet from "./Wallet";

const Navbar = () => {
  return (
    <Box
      width="full"
      height="16"
      paddingX="12"
      paddingY="4"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      // borderBottomWidth="px"
      // borderColor="black"
      marginBottom="8"
    >
      <Link href="/" passHref={true}>
        <Box as="a">
          <Text align="left" variant="extraLarge">
            LOUDVΞRSΞ
          </Text>
        </Box>
      </Link>
      <Wallet />
    </Box>
  );
};

export default Navbar;
