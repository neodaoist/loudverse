import { Box } from "degen";
import Navbar from "./Navbar";

const PageWrapper = ({ children }) => {
  return (
    <Box height="viewHeight" display="flex" alignItems="center" flexDirection="column">
      <Navbar />
      <Box width="full" maxWidth="screenXl" marginX="16" backgroundColor="backgroundSecondary">
        {children}
      </Box>
    </Box>
  );
};

export default PageWrapper;
