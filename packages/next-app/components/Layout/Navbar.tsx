import { Box, Button, Text, IconSun, useTheme, IconMoon } from "degen";
import Link from "next/link";
import Wallet from "./Wallet";
import Image from "next/image";

const Navbar = () => {
  const { mode, setMode } = useTheme();

  const handleMode = () => {
    setMode(mode == "light" ? "dark" : "light");
  };

  return (
    <Box
      width="full"
      height="16"
      paddingX="12"
      paddingY="4"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      marginBottom="4"
      borderBottomWidth="px"
      borderColor="foregroundSecondary"
      maxWidth="screenXl"
    >
      <Link href="/" passHref={true}>
        <Box as="a">
          <Text weight="semiBold" letterSpacing="-0.02" size="large" font="mono">
            L O U D V E R S E
          </Text>
          {/* TODO trim logo // too wide */}
          {/* <Image src="/../public/loudverse_logo_dark.png" width="300" height="20" /> */}
        </Box>
      </Link>
      <Box display="flex">
        <Box display="flex" alignItems="center" width="auto" marginRight="6">
          <Box cursor="pointer" paddingX="4" onClick={() => handleMode()}>
            {mode == "light" ? (
              <IconMoon size="8" strokeWidth={"0.375"} color={"black"} />
            ) : (
              <IconSun size="8" strokeWidth={"0.375"} color={"yellow"} />
            )}
          </Box>
          <Link href="/calls" passHref={true}>
            <Box as="a" paddingX="4">
              <Button size="small" variant="transparent">
                Open Calls
              </Button>
            </Box>
          </Link>
          <Link href="/calls/create" passHref={true}>
            <Box as="a" paddingX="4">
              <Button size="small" variant="transparent">
                Create
              </Button>
            </Box>
          </Link>
        </Box>
        <Wallet />
      </Box>
    </Box>
  );
};

export default Navbar;
