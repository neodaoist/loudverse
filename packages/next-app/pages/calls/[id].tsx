import type { NextPage } from "next";
import { useRouter } from "next/router";
import FullPageCallDetails from "../../components/FullPageProject";

const Call: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  return <FullPageCallDetails proxyAddress={id} />;
};

export default Call;
