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
}

const BingoContext = createContext({} as ContextProps);

export default function BingoProvider(props: { children: React.ReactNode }) {
  const [drawedNumbers, setDrawedNumbers] = useState<
    ContextProps["drawedNumbers"]
  >([]);

  const [loading, setLoading] = useState(true);

  function drawNumbers() {
    setLoading(true);

    setDrawedNumbers([
      { number: "1", selected: false },
      { number: "2", selected: false },
      { number: "3", selected: false },
      { number: "4", selected: false },
      { number: "5", selected: false },
      { number: "6", selected: false },
      { number: "7", selected: false },
      { number: "8", selected: false },
      { number: "9", selected: false },
      { number: "10", selected: false },
      { number: "11", selected: false },
      { number: "12", selected: false },
      { number: "logo", selected: false },
      { number: "13", selected: false },
      { number: "14", selected: false },
      { number: "15", selected: false },
      { number: "16", selected: false },
      { number: "17", selected: false },
      { number: "18", selected: false },
      { number: "19", selected: false },
      { number: "20", selected: false },
      { number: "21", selected: false },
      { number: "22", selected: false },
      { number: "23", selected: false },
      { number: "24", selected: false },
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
      }}
    >
      {props.children}
    </BingoContext.Provider>
  );
}

export const useBingo = () => useContext(BingoContext);
