"use client";

import Button from "@/app/components/Button";
import BingoSquare from "./BingoSquare";

import { useBingo } from "@/contexts/BingoContext";

import Fireworks from "react-canvas-confetti/dist/presets/fireworks";

export default function BingoCard() {
  const { drawedNumbers, selectANumber, drawNumbers, bingo } = useBingo();

  return (
    <>
      <div className="container flex flex-col items-center relative">
        <Button
          className="!bg-green !text-white rounded-b-none z-[1]"
          onClick={drawNumbers}
        >
          Sortear cartela
        </Button>
        <div className="rounded-xl border text-wine-medium border-wine-medium bg-wine-medium overflow-hidden mb-[50px] tablet:mb-[150px] flex flex-col w-fit">
          <div className="flex">
            <BingoSquare text="B" headSquare />
            <BingoSquare text="I" headSquare />
            <BingoSquare text="N" headSquare />
            <BingoSquare text="G" headSquare />
            <BingoSquare text="O" headSquare />
          </div>
          <div
            className="flex flex-col flex-wrap max-h-[20rem] tablet:max-h-[25rem]"
            id="bingo-card"
          >
            {drawedNumbers.map(({ number, selected }, i) => (
              <BingoSquare
                key={number}
                text={number.toString().padStart(2, "0")}
                selected={selected}
                onClick={() => selectANumber(i)}
                logo={number === "logo"}
              />
            ))}
          </div>
        </div>
        {bingo && (
          <Fireworks
            className="w-full h-full absolute top-0 left-0"
            autorun={{ speed: 1 }}
          />
        )}
      </div>
    </>
  );
}
