import type { NextPage } from "next";
import Head from "next/head";
import styles from "../../styles/Home.module.css"; // change

const Users: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Users!</a>
        </h1>
      </main>

    </div>
  );
};

export default Users;
