import type { NextPage } from "next";
import { useRouter } from "next/router";
import PageWrapper from "../../components/Layout/PageWrapper";
import FullPageUser from "../../components/FullPageUser";

const User: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <PageWrapper>
      <FullPageUser address={id} />
    </PageWrapper>
  );
};

export default User;
