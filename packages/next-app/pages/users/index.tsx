import { Box } from "degen";
import type { NextPage } from "next";
import PageWrapper from "../../components/Layout/PageWrapper";
import CenterColumn from "../../components/Layout/CenterColumn";

const Users: NextPage = () => {
  return (
    <CenterColumn>
      <PageWrapper>
        <Box>You must view a specific user</Box>
      </PageWrapper>
    </CenterColumn>
  );
};

export default Users;
