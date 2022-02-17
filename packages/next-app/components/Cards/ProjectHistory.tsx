import React from "react";
import { Box, Tag, Text } from "degen";

const ProjectHistory = ({ history }: { history: ProjectHistoryType[] }) => {
  return (
    <Box backgroundColor="foregroundSecondary" borderRadius="medium" padding="4" height="80">
      <Box marginBottom="4">
        <Text size="extraLarge">Crypto-Credentials</Text>
      </Box>
      {history.map(project => (
        <Box marginBottom="4">
          <Box display="flex" alignItems="center" marginBottom="1">
            <Text size="small" variant="label">
              {project.date}
            </Text>
            <Box marginLeft="2">
              <Tag size="small">{project.category}</Tag>
            </Box>
          </Box>
          <Text>
            Created '{project.project}' with {project.raised} {project.token} from {project.funders} funders
          </Text>
        </Box>
      ))}
    </Box>
  );
};

export default ProjectHistory;
