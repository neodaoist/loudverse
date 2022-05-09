import type { GetServerSideProps } from "next";
import cookieCutter from "cookie-cutter";

import { getAllCallsForFunds, getCallForFundsByID } from "../../graph/functions";
import { CallForFunding } from "../../graph/loudverse-graph-types";
import FullPageCallDetails from "../../components/FullPageProject";
import PageWrapper from "../../components/Layout/PageWrapper";

const Call = ({ call }: { call: CallForFunding }) => {
  return (
    <PageWrapper title={call?.title} description={call?.description}>
      <FullPageCallDetails call={call} />
    </PageWrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const { id } = context.params;
  const cookie = cookieCutter(context.req.headers);
  let call;
  let lcv = 0;

  const waitForSupgraphToPropogateLoop = async () => {
    const allCalls = await getAllCallsForFunds();

    call = allCalls[Number(id)];
    if (!call) {
      const checkAddress = callObj => {
        return (id as string).toLowerCase() === callObj.id;
      };
      const index = allCalls.findIndex(checkAddress);
      call = allCalls[index];
    }
  };

  while (lcv < 3 && !call) {
    lcv++;
    try {
      await waitForSupgraphToPropogateLoop();
    } catch (error) {
      // couldnt find cff, trying again in 1s
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  return {
    props: {
      call: call,
      mode: cookie.get("mode") || null,
    },
  };
};

export default Call;
