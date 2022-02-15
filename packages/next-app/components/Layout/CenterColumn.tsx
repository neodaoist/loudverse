import { Box } from "degen";
import Navbar from "./Navbar";

const CenterColumn = ({ children }) => {
  return (
    <Box maxWidth="256" margin="auto">
      {children}
    </Box>
  );
};

export default CenterColumn;
