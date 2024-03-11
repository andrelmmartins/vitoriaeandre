import Head from "next/head";

import Intro from "../sections/Intro";
import Footer from "../sections/Footer";
import BingoCard from "./components/BingoCard";
import Separator from "../sections/Separator";

export default function BingoPage() {
  return (
    <>
      <Head>
        <title>Bingo · Vitória & André</title>
      </Head>
      <main>
        <Intro hideCountDown />
        <Separator />
        <BingoCard />
        <Footer />
      </main>
    </>
  );
}
