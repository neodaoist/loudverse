import type { NextPage } from "next";
import Head from "next/head";
import styles from "../../styles/Home.module.css"; // change
import { useRouter } from "next/router";
import FullPageCallDetails from "../../components/FullPageProject";

const Call: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  return <FullPageCallDetails proxyAddress={id} />;
};

export default Call;
