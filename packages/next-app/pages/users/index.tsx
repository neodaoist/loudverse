import { Box } from "degen";
import type { GetServerSideProps, NextPage } from "next";
import cookieCutter from "cookie-cutter";
import PageWrapper from "../../components/Layout/PageWrapper";

const Users: NextPage = () => {
  return (
    <PageWrapper title="Users">
      <Box color="foreground">You must view a specific user</Box>
    </PageWrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const cookie = cookieCutter(context.req.headers);

  return {
    props: {
      mode: cookie.get("mode") || null,
    },
  };
};

export default Users;
