import { Box } from "degen";

const CenterColumn = ({ children }) => {
  return (
    <Box maxWidth="288" margin="auto" paddingX="16" paddingY="8" backgroundColor="background">
      {children}
    </Box>
  );
};

export default CenterColumn;
