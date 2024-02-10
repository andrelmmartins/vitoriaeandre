"use client";

import Countdown from "react-countdown";

export interface Props {
  date?: Date;
}

export default function CountDown({
  date = new Date("2024/03/16 18:00 -03:00"),
}: Props) {
  return (
    <Countdown
      date={date}
      renderer={({ days, hours, minutes, seconds }) => {
        const numbers: { number: number; label: string }[] = [
          { label: "dias", number: days },
          { label: "horas", number: hours },
          { label: "minutos", number: minutes },
          { label: "segundos", number: seconds },
        ];

        return (
          <div className="flex flex-col items-center">
            <span className="block text-white bg-green text-sm leading-none px-[36px] py-[6px] z-[1] rounded-sm">
              Contagem regressiva
            </span>
            <div className="flex gap-[10px] -mt-[10px]">
              {numbers.map(({ label, number }) => (
                <span
                  key={label}
                  className="h-[65px] w-[65px] rounded bg-beige-medium text-center relative flex flex-col items-center justify-center"
                >
                  <h4 className="text-3xl">
                    {number.toString().padStart(2, "0")}
                  </h4>
                  <p className="text-[11px] absolute bottom-[3px]">{label}</p>
                </span>
              ))}
            </div>
          </div>
        );
      }}
    />
  );
}