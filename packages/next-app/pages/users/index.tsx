import { Box } from "degen";
import type { NextPage } from "next";
import Head from "next/head";
import PageWrapper from "../../components/Layout/PageWrapper";
import styles from "../../styles/Home.module.css"; // change

const Users: NextPage = () => {
  return (
    <PageWrapper>
      <Box>You must view a specific user</Box>
    </PageWrapper>
  );
};

export default Users;
