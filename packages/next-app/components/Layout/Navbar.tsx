import { Box, Button, Text, IconSun, useTheme, IconMoon } from "degen";
import Link from "next/link";
import Image from "next/image";
import Wallet from "./Wallet";
import styles from "./Navbar.module.css";
import logoDark from "../../public/dark_tight.png";
import logoLight from "../../public/light_tight.png";
import cookieCutter from "cookie-cutter";

const Navbar = () => {
  const { mode, setMode } = useTheme();
  const handleMode = () => {
    const newMode = mode === "light" ? "dark" : "light";
    cookieCutter.set("mode", newMode, { path: "/" });
    setMode(newMode);
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
          <Image alt="logo" src={mode == "light" ? logoDark : logoLight} width="220" height="24" />
        </Box>
      </Link>
      <Box display="flex">
        <Box display="flex" alignItems="center" width="auto" marginRight="6">
          <Box display="flex" alignItems="center" cursor="pointer" paddingX="4" onClick={() => handleMode()}>
            {mode == "light" ? (
              <>
                <span className={styles.solarFade}>Solarpunk Mode</span>
                <IconMoon size="8" strokeWidth={"0.375"} color={"black"} />
              </>
            ) : (
              <>
                <span className={styles.lunarFade}>Lunarpunk Mode</span>
                <IconSun size="8" strokeWidth={"0.375"} color={"yellow"} />
              </>
            )}
          </Box>
          <Link href="/about" passHref={true}>
            <Box as="a" paddingX="2">
              <Button size="small" variant="transparent">
                About
              </Button>
            </Box>
          </Link>
          <Link href="/calls" passHref={true}>
            <Box as="a" paddingX="2">
              <Button size="small" variant="transparent">
                View Calls
              </Button>
            </Box>
          </Link>
          {/* <Link href="/calls/create" passHref={true}>
            <Box as="a" paddingX="2">
              <Button size="small" variant="transparent">
                Create Call
              </Button>
            </Box>
          </Link> */}
        </Box>
        <Wallet />
      </Box>
    </Box>
  );
};

export default Navbar;
