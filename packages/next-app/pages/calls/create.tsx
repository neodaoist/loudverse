import type { NextPage } from "next";
import PageWrapper from "../../components/Layout/PageWrapper";
import NewProjectForm from "../../components/Forms/NewProjectForm"; // change
import PageWrapper from "../../components/Layout/PageWrapper";

const Create: NextPage = () => {
  return (
    <PageWrapper>
      <NewProjectForm />
    </PageWrapper>
  );
};

export default Create;
