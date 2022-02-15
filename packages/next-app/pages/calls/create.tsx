import type { NextPage } from "next";
import PageWrapper from "../../components/Layout/PageWrapper";
import NewProjectForm from "../../components/Forms/NewProjectForm"; // change

const Create: NextPage = () => {
  return (
    <PageWrapper>
      <NewProjectForm />
    </PageWrapper>
  );
};

export default Create;
