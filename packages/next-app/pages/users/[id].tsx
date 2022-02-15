import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import FullPageUser from "../../components/FullPageUser";
import PageWrapper from "../../components/Layout/PageWrapper";
import { User } from "../../graph/loudverse-graph-types";
import { getAllUsers, getUserByID } from "../../graph/functions";

const User = ({ user }: { user: User }) => {
  return (
    <PageWrapper>
      <FullPageUser user={user} />
    </PageWrapper>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allUsers = await getAllUsers();
  const paths = [];

  allUsers.forEach(user => {
    paths.push({ params: { id: `${user.id}` } });
  });

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async context => {
  const { id } = context.params;
  const user = await getUserByID(id as string);

  if (user) {
    return {
      props: {
        user: user,
      },
    };
  }
  return { props: { notFound: true } };
};

export default User;
