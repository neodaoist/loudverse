import type { GetStaticPaths, GetStaticProps } from "next";

import { getAllCallsForFunds, getCallForFundsByID } from "../../graph/functions";
import { CallForFunding } from "../../graph/loudverse-graph-types";
import FullPageCallDetails from "../../components/FullPageProject";
import PageWrapper from "../../components/Layout/PageWrapper";

const Call = ({ call }: { call: CallForFunding }) => {
  console.log(call.fundingState);
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

  let call = allCalls[Number(id)];
  if (call === undefined) {
    const checkAddress = call => {
      return (id as string).toLowerCase() === call.id;
    };
    const index = allCalls.findIndex(checkAddress);
    call = allCalls[index];
  }

  return {
    props: {
      call: call,
    },
  };
};

export default Call;
