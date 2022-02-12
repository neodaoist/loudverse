import { Box, Text } from "degen";
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
    >
      <Text align="left" variant="extraLarge">
        LOUDVΞRSΞ
      </Text>
      <Wallet />
    </Box>
  );
};

export default Navbar;
