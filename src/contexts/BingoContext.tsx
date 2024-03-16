"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface ContextProps {
  loading: boolean;

  drawNumbers: () => void;
  selectANumber: (index: number) => void;
  drawedNumbers: {
    number: string;
    selected: boolean;
  }[];

  bingo: boolean;
  hideBingo: () => void;
}

const BingoContext = createContext({} as ContextProps);

export default function BingoProvider(props: { children: React.ReactNode }) {
  const [drawedNumbers, setDrawedNumbers] = useState<
    ContextProps["drawedNumbers"]
  >([]);

  const [loading, setLoading] = useState(true);
  const [bingo, setBingo] = useState(false);

  useEffect(() => {
    const hasSomeNotSelected = drawedNumbers.some(({ selected }) => !selected);

    if (drawedNumbers.length > 0 && !hasSomeNotSelected) {
      setBingo(true);
    } else setBingo(false);
  }, [drawedNumbers]);

  function drawANumber(min: number, max: number) {
    return Math.ceil(Math.random() * (max - min)) + min;
  }

  function drawNumbers() {
    setLoading(true);

    const numbers: number[] = [];

    while (numbers.length < 25) {
      const min = Math.floor(numbers.length / 5) * 15;
      const max = Math.floor(numbers.length / 5) * 15 + 15;

      const drawedNumber = drawANumber(min, max);
      if (!numbers.includes(drawedNumber)) numbers.push(drawedNumber);
    }

    setDrawedNumbers([
      ...numbers
        .slice(0, 12)
        .map((n) => ({ number: n.toString(), selected: false })),

      { number: "logo", selected: true },

      ...numbers
        .slice(12, 24)
        .map((n) => ({ number: n.toString(), selected: false })),
    ]);

    setLoading(false);
  }

  function selectANumber(index: number) {
    setDrawedNumbers(
      drawedNumbers.map((drawedNumber, i) => {
        if (index === i)
          return {
            ...drawedNumber,
            selected: !drawedNumber.selected,
          };

        return drawedNumber;
      })
    );
  }

  useEffect(() => {
    drawNumbers();
  }, []);

  return (
    <BingoContext.Provider
      value={{
        loading,

        drawNumbers,
        selectANumber,
        drawedNumbers,

        bingo,
        hideBingo: () => setBingo(false),
      }}
    >
      {props.children}
    </BingoContext.Provider>
  );
}

export const useBingo = () => useContext(BingoContext);
