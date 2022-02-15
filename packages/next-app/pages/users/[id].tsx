import type { NextPage } from "next";
import { useRouter } from "next/router";
import FullPageUser from "../../components/FullPageUser";

const User: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return <FullPageUser address={id} />;
};

export default User;
