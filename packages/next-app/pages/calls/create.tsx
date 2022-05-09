import type { GetServerSideProps, NextPage } from "next";
import cookieCutter from "cookie-cutter";
import PageWrapper from "../../components/Layout/PageWrapper";
import NewProjectForm from "../../components/Forms/NewProjectForm"; // change

const Create: NextPage = () => {
  return <PageWrapper title={"Create New Call for Funds"}>{/* <NewProjectForm /> */}</PageWrapper>;
};

export const getServerSideProps: GetServerSideProps = async context => {
  const cookie = cookieCutter(context.req.headers);

  return {
    props: {
      mode: cookie.get("mode") || null,
    },
  };
};

export default Create;
