import { Box } from "degen";
import Navbar from "./Navbar";

const PageWrapper = ({ children }) => {
  return (
    <Box height="viewHeight" display="flex" flexDirection="column">
      <Navbar />
      <Box>{children}</Box>
    </Box>
  );
};

export default PageWrapper;
