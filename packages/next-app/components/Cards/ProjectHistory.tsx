import React from "react";
import { Box, Tag, Text } from "degen";

const ProjectHistory = ({ history }) => {
  return (
    <Box
      backgroundColor="foregroundSecondary"
      borderRadius="medium"
      padding="4"
      height="80"
      borderWidth="0.5"
      borderColor="accent"
    >
      <Box marginBottom="4">
        <Text size="extraLarge">Crypto-Credentials</Text>
      </Box>
      {history.map((project, i) => (
        <Box key={i} marginBottom="4">
          <Box display="flex" alignItems="center" marginBottom="1">
            <Text size="small" variant="label">
              {project.date}
            </Text>
            <Box marginLeft="2">
              <Tag size="small">{project.category}</Tag>
            </Box>
          </Box>
          <Text>
            Created &apos;{project.project}&apos; with {project.raised} {project.token} from {project.funders} funders
          </Text>
        </Box>
      ))}
    </Box>
  );
};

export default ProjectHistory;
