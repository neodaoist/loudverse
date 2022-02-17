import type { NextPage } from "next";
import PageWrapper from "../../components/Layout/PageWrapper";
import NewProjectForm from "../../components/Forms/NewProjectForm"; // change
import CenterColumn from "../../components/Layout/CenterColumn";

const Create: NextPage = () => {
  return (
    <CenterColumn>
      <PageWrapper>
        <NewProjectForm />
      </PageWrapper>
    </CenterColumn>
  );
};

export default Create;
