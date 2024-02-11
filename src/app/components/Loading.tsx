import Icon from "./Icon";

export interface Props {
  size?: "sm" | "md" | "lg";
}

export default function Loading({ size = "sm" }: Props) {
  if (size === "sm")
    return (
      <Icon id="progress" className="h-[16px] w-[16px] animate-spin mx-auto" />
    );

  if (size === "md")
    return (
      <Icon id="progress" className="h-[32px] w-[32px] animate-spin mx-auto" />
    );

  return (
    <Icon id="progress" className="h-[64px] w-[64px] animate-spin mx-auto" />
  );
}
