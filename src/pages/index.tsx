import type { NextPage } from "next";
import Head from "next/head";
import { GalleryView } from "../views";

const Home: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>NF Hustle</title>
        <meta
          name="description"
          content="NFHustle Private Profiles"
        />
      </Head>
      <GalleryView />
    </div>
  );
};

export default Home;
