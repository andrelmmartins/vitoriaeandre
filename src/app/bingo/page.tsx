"use client";

import Intro from "../sections/Intro";
import Footer from "../sections/Footer";
import BingoCard from "./components/BingoCard";
import Separator from "../sections/Separator";

export default function BingoPage() {
  return (
    <main>
      <Intro hideCountDown />
      <Separator />
      <BingoCard />
      <Footer />
    </main>
  );
}
