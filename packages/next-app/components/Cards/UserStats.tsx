import React from "react";
import { Box, Text } from "degen";

const UserStats = ({ stats }) => {
  return (
    <Box backgroundColor="foregroundSecondary" borderRadius="medium" padding="4">
      <Box marginBottom="4">
        <Text size="large">
          Raised {stats.raised} ETH for {stats.projects} projects
        </Text>
      </Box>
      <Box marginBottom="4">
        <Text size="large">Collaboarated with {stats.collaborators} other creators</Text>
      </Box>
      <Box>
        <Text size="large">Currently working on {stats.current}</Text>
      </Box>
    </Box>
  );
};

export default UserStats;
