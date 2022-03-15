import type { GetServerSideProps } from "next";
import cookieCutter from "cookie-cutter";

import { getAllCallsForFunds, getCallForFundsByID } from "../../graph/functions";
import { CallForFunding } from "../../graph/loudverse-graph-types";
import FullPageCallDetails from "../../components/FullPageProject";
import PageWrapper from "../../components/Layout/PageWrapper";

const Call = ({ call }: { call: CallForFunding }) => {
  return (
    <PageWrapper>
      <FullPageCallDetails call={call} />
    </PageWrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const { id } = context.params;
  const allCalls = await getAllCallsForFunds();
  const cookie = cookieCutter(context.req.headers);

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
      mode: cookie.get("mode"),
    },
  };
};

export default Call;
