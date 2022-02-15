import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import styles from "../../styles/Home.module.css"; // change
import FullPageCallDetails from "../../components/FullPageProject";
import { getCallForFundsByID, getAllCallsForFunds } from "../../graph/functions";
import { CallForFunding } from "../../graph/loudverse-graph-types";
import PageWrapper from "../../components/Layout/PageWrapper";

const Call = ({ call }: { call: CallForFunding }) => {
  return (
    <PageWrapper>
      <FullPageCallDetails call={call} />
    </PageWrapper>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allCalls = await getAllCallsForFunds();
  const paths = [];

  allCalls.forEach((call, i) => {
    paths.push({ params: { id: `${i}` } });
  });

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async context => {
  const { id } = context.params;
  const allCalls = await getAllCallsForFunds();

  const call = allCalls[Number(id)];

  return {
    props: {
      call: call,
    },
  };
};

export default Call;
