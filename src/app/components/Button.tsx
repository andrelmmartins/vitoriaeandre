import { ButtonHTMLAttributes, MouseEventHandler } from "react";

export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  allowClickPropagation?: boolean;
}

export default function Button({ className, onClick, ...props }: Props) {
  return (
    <button
      {...props}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        if (onClick) onClick(e);
      }}
      className={`transition-all duration-200 text-beige py-[16px] px-[32px] bg-wine hover:bg-wine-medium rounded h-fit w-fit font-bold ${className}`}
    >
      {props.children}
    </button>
  );
}
