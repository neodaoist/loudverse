import React from "react";
import { Box, Text } from "degen";

const Video = ({ videoUri }: { videoUri: string }) => {
  return (
    <Box padding="4" backgroundColor="foregroundSecondary" borderRadius="medium">
      <Box marginBottom="4">
        <Text size="extraLarge" weight="semiBold">
          Project Video
        </Text>
      </Box>
      <Box>
        <video
          width="592"
          height="333"
          src={videoUri}
          // src="https://cdn.livepeer.com/recordings/cc7d1e64-9e71-4060-ae26-2c56db1c855c/source.mp4"
          controls
        ></video>
      </Box>
    </Box>
  );
};

export default Video;
