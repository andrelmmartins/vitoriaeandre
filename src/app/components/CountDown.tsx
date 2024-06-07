"use client";

import Countdown from "react-countdown";

export interface Props {
  date?: Date;
}

export default function CountDown({
  date = new Date("2024/06/14 18:30 -03:00"),
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
            <span className="block text-white bg-green text-sm leading-none px-[20px] micro:px-[36px] py-[6px] z-[1] rounded-[4px]">
              Contagem regressiva
            </span>
            <div className="flex gap-[10px] -mt-[10px]">
              {numbers.map(({ label, number }) => (
                <span
                  key={label}
                  className="h-[50px] w-[50px] micro:h-[65px] micro:w-[65px] rounded bg-beige-medium text-center relative flex flex-col items-center justify-center"
                >
                  <h4 className="text-xl micro:text-3xl">
                    {number.toString().padStart(2, "0")}
                  </h4>
                  <p className="text-[9px] micro:text-[11px] absolute bottom-[3px]">
                    {label}
                  </p>
                </span>
              ))}
            </div>
          </div>
        );
      }}
    />
  );
}

export function CountDownSkeleton(props: {
  className: HTMLElement["className"];
}) {
  const numbers: { number: number; label: string }[] = [
    { label: "dias", number: 0 },
    { label: "horas", number: 0 },
    { label: "minutos", number: 0 },
    { label: "segundos", number: 0 },
  ];

  return (
    <div className={`flex flex-col items-center ${props.className}`}>
      <span className="block text-white bg-green text-sm leading-none px-[20px] micro:px-[36px] py-[6px] z-[1] rounded-[4px]">
        Contagem regressiva
      </span>
      <div className="flex gap-[10px] -mt-[10px]">
        {numbers.map(({ label, number }) => (
          <span
            key={label}
            className="h-[50px] w-[50px] micro:h-[65px] micro:w-[65px] rounded bg-beige-medium text-center relative flex flex-col items-center justify-center"
          >
            <h4 className="text-xl micro:text-3xl">
              {number.toString().padStart(2, "0")}
            </h4>
            <p className="text-[9px] micro:text-[11px] absolute bottom-[3px]">
              {label}
            </p>
          </span>
        ))}
      </div>
    </div>
  );
}
