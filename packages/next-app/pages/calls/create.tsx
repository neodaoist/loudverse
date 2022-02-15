import type { NextPage } from "next";
import Head from "next/head";
import styles from "../../styles/Home.module.css";
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
