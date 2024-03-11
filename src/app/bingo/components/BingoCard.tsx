import BingoSquare from "./BingoSquare";

import { useBingo } from "@/contexts/BingoContext";

export default function BingoCard() {
  const { drawedNumbers, selectANumber } = useBingo();

  return (
    <div className="container">
      <div className="rounded-xl border border-wine-medium bg-wine-medium overflow-hidden mb-[150px] mx-auto flex flex-col w-fit">
        <div className="flex">
          <BingoSquare text="B" headSquare />
          <BingoSquare text="I" headSquare />
          <BingoSquare text="N" headSquare />
          <BingoSquare text="G" headSquare />
          <BingoSquare text="O" headSquare />
        </div>
        <div className="flex flex-col flex-wrap max-h-[25rem]" id="bingo-card">
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
    </div>
  );
}
