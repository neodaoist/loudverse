import { Box, Text } from "degen";
import Link from "next/link";
import Wallet from "./Wallet";
import Image from "next/image";

const Navbar = () => {
  return (
    <Box
      width="full"
      height="16"
      // paddingX="12"
      paddingY="4"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      marginBottom="8"
    >
      <Link href="/" passHref={true}>
        <Box as="a">
          <Image src="/../public/loudverse_logo_dark.png" width="599" height="41"></Image>
        </Box>
      </Link>
      <Wallet />
    </Box>
  );
};

export default Navbar;
