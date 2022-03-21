import React from "react";
import { Box, Text } from "degen";
import Image from "next/image";
import LivepeerLogo from "../../public/256x256_Badge_Green.png";

const Video = ({ videoUri }: { videoUri: string }) => {
  return (
    <Box padding="4" backgroundColor="foregroundSecondary" borderRadius="medium">
      <Box marginBottom="4">
        <Text size="extraLarge" weight="semiBold">
          Project Video
        </Text>
      </Box>
      <Box>
        <video width="592" height="333" src={videoUri} controls></video>
      </Box>
      <Box position="relative" width="full" height="8" display="flex" justifyContent="center">
        <Box marginY="3">
          <Text size="small" font="mono" weight="semiBold" align="center">
            POWERED BY LIVEPEER
          </Text>
        </Box>
        <Box
          position="relative"
          width="8"
          height="full"
          justifyContent="center"
          alignItems="center"
          marginTop="1"
          marginLeft="2"
        >
          <Image src={LivepeerLogo} layout="fill" objectFit="contain" alt="Livepeer Logo" />
        </Box>
      </Box>
    </Box>
  );
};

export default Video;
