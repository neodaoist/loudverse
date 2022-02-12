import { Box } from "degen";
import Navbar from "./Navbar";

const PageWrapper = ({ children }) => {
  return (
    <Box width="viewWidth" height="viewHeight" display="flex" flexDirection="column">
      <Navbar />
      {children}
    </Box>
  );
};

export default PageWrapper;
