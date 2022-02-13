import type { NextPage } from "next";
import Head from "next/head";
import styles from "../../styles/Home.module.css"; // change
import { useRouter } from "next/router";
import FullPageUser from "../../components/FullPageUser";

const User: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return <FullPageUser address={id} />;
};

export default User;
