import { Box, Text } from "degen";

const Footer = () => {
  return (
    <>
      <Box
        borderTopWidth="0.5"
        borderColor="foregroundTertiary"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        marginX="auto"
        paddingY="4"
      >
        <Box marginX="auto" marginY="2">
          <Text align="center" size="large">
            © 2022 LOUDVΞRSΞ. All rights reserved.
          </Text>
        </Box>
        <Text align="center">
          💚 <em>Helping artists ship creative work</em> 💚
        </Text>
      </Box>
    </>
  );
};

export default Footer;
