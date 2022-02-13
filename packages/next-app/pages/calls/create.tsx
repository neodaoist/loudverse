import type { NextPage } from "next";
import Head from "next/head";
import styles from "../../styles/Home.module.css";
import NewProjectForm from "../../components/Forms/NewProjectForm"; // change

const Create: NextPage = () => {
  return <NewProjectForm />;
};

export default Create;
