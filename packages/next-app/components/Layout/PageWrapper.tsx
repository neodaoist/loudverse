import { Box } from "degen";
import Navbar from "./Navbar";

const PageWrapper = ({ children }) => {
  return (
    <Box width="viewWidth" height="viewHeight" display="flex" flexDirection="column">
      <Navbar />
      <Box marginX="16">{children}</Box>
    </Box>
  );
};

export default PageWrapper;
