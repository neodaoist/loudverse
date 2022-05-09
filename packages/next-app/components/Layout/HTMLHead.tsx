import Head from "next/head";

const HTMLHead = ({ title, description }: { title?: string; description?: string }) => {
  let pageTitle = `LOUDVΞRSΞ: Skill Marketplace, Crowdfunding, Gig Economy`;
  let pageDescription = `LOUDVΞRSΞ is a 2-sided marketplace for funding hard-to-quantify public goods like music, poetry, and theater.`;

  if (title) {
    // 'PROJECTNAME - LOUDVΞRSΞ' max 55 chars
    pageTitle = (title?.length > 43 ? `${title.slice(0, 43).concat("...")}` : `${title}`).concat(` - LOUDVΞRSΞ`);
  }
  if (description) {
    // max 150 chars
    pageDescription = description?.length > 147 ? `${description.slice(0, 147).concat("...")}` : `${description}`;
  }

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default HTMLHead;
