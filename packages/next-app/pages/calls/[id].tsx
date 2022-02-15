import type { NextPage } from "next";
import { useRouter } from "next/router";
import PageWrapper from "../../components/Layout/PageWrapper";
import FullPageCallDetails from "../../components/FullPageProject";

const Call: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <PageWrapper>
      <FullPageCallDetails proxyAddress={id} />
    </PageWrapper>
  );
};

export default Call;
