import { Box } from "degen";
import Footer from "./Footer";
import HTMLHead from "./HTMLHead";
import Navbar from "./Navbar";

const PageWrapper = ({ title, description, children }: { title?: string; description?: string; children: any }) => {
  return (
    <>
      <HTMLHead title={title} description={description} />
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
