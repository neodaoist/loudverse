import { Box } from "degen";
import Footer from "./Footer";
import HTMLHead from "./HTMLHead";
import Navbar from "./Navbar";

const PageWrapper = ({ children }) => {
  return (
    <>
      <HTMLHead />
      <Box height="viewHeight" display="flex" alignItems="center" flexDirection="column">
        <Navbar />
        <Box width="full" maxWidth="screenXl" marginX="16" paddingBottom="16" backgroundColor="backgroundSecondary">
          {children}
        </Box>
        <Footer />
      </Box>
    </>
  );
};

export default PageWrapper;
