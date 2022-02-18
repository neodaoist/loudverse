import { Box, Text } from "degen";
import { Line } from "rc-progress";

const ProgressBar = ({ percent }: { percent: string }) => (
  <Box display="flex" flexDirection="column" alignItems="center" marginBottom="4">
    <Text align="center">{percent}% Funded</Text>
    <Line percent={Number(percent)} strokeWidth={6} strokeColor="#61c87b" />
  </Box>
);

export default ProgressBar;
