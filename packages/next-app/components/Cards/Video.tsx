import React from "react";
import { Box, Text, useTheme } from "degen";
import Logo from "../Livepeer";

const Video = ({ videoUri }: { videoUri: string }) => {
  const { mode, setMode } = useTheme();
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
      <Box display="flex" justifyContent="flex-end">
        <Box display="flex">
          <em>Powered by</em>
          <Logo height={20} darkMode={mode === "dark"} />
        </Box>
      </Box>
    </Box>
  );
};

export default Video;
