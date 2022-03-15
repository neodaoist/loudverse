import type { GetServerSideProps } from "next";
import cookieCutter from "cookie-cutter";
import FullPageUser from "../../components/FullPageUser";
import PageWrapper from "../../components/Layout/PageWrapper";
import { User } from "../../graph/loudverse-graph-types";
import { getAllUsers, getUserByID } from "../../graph/functions";

const User = ({ user }: { user: User }) => {
  return (
    <PageWrapper>
      <FullPageUser
      // user={user}
      />
    </PageWrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const { id } = context.params;
  const user = await getUserByID(id as string);
  const cookie = cookieCutter(context.req.headers);

  if (user) {
    return {
      props: {
        user: user,
        mode: cookie.get("mode"),
      },
    };
  }
  return { props: { notFound: true, mode: cookie.get("mode") } };
};

export default User;
