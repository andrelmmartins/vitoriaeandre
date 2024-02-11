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
    <section className="laptop:h-screen laptop:max-h-[800px] container pt-[64px] grid laptop:grid-cols-2">
      <div className="flex flex-col justify-between h-full gap-[48px] items-center laptop:items-start pb-[64px]">
        <Icon id="logo" className="h-[100px] w-[47px]" />

        <h1 className="text-[70px] laptop:text-[100px] text-center laptop:text-left text-angle">
          Vitória
          <br />
          &André
        </h1>

        <div id="countdown" />
      </div>
      <div className="bg-wine w-full h-fit laptop:h-full rounded-t-full relative max-w-[560px] mx-auto">
        <Image
          width={675}
          height={590}
          src="/polaroid.png"
          alt="Foto do Casal"
          className="laptop:absolute laptop:top-[32px] object-contain w-full h-[350px] mobile:h-[400px] laptop:h-[90%]"
          fetchPriority="high"
        />
        <Icon
          id="ramo"
          className="absolute top-0 right-0 w-[80px] h-[40px] hidden laptop:block"
        />
      </div>
    </section>
  );
}
