import { ButtonHTMLAttributes } from "react";

export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({ className, ...props }: Props) {
  return (
    <button
      {...props}
      className={`transition-all duration-200 text-beige py-[16px] px-[32px] bg-wine hover:bg-wine-medium rounded h-fit w-fit font-bold ${className}`}
    >
      {props.children}
    </button>
  );
}
