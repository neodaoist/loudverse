import type { GetStaticPaths, GetStaticProps } from "next";

import { getAllCallsForFunds } from "../../graph/functions";
import { CallForFunding } from "../../graph/loudverse-graph-types";
import FullPageCallDetails from "../../components/FullPageProject";
import PageWrapper from "../../components/Layout/PageWrapper";
import CenterColumn from "../../components/Layout/CenterColumn";

const Call = ({ call }: { call: CallForFunding }) => {
  return (
    <CenterColumn>
      <PageWrapper>
        <FullPageCallDetails call={call} />
      </PageWrapper>
    </CenterColumn>
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
