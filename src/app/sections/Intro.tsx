"use client";

import { useEffect } from "react";
import { createRoot } from "react-dom/client";

import CountDown from "../components/CountDown";
import Icon from "../components/Icon";
import Image from "next/image";

export default function Intro() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const section = document.getElementById("countdown");
      if (section) {
        const root = createRoot(section);
        root.render(<CountDown />);
      }
    }
  }, []);

  return (
    <section className="h-screen container pt-[4rem] grid grid-cols-2 relative">
      <div className="flex flex-col justify-between h-full items-start pb-[4rem]">
        <Icon id="logo" className="h-[100px] w-[47px]" />

        <h1 className="text-[100px]">
          Vitória
          <br />
          &André
        </h1>

        <div id="countdown" />
      </div>
      <div className="bg-wine w-full h-full rounded-t-full relative">
        <Image
          width={675}
          height={590}
          src="/polaroid.png"
          alt="Foto do Casal"
          className="absolute top-[2rem] object-contain w-full h-[90%]"
        />
      </div>
      <Icon
        id="ramo"
        className="absolute top-[4rem] right-0 w-[80px] h-[40px]"
      />
    </section>
  );
}
