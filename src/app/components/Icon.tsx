export interface Props {
  id: "logo" | "ramo" | "close" | "click" | "progress";
  className?: HTMLElement["className"];
}

export default function Icon({ id, ...props }: Props) {
  return (
    <svg {...props}>
      <use href={`/sprites.svg#${id}`} />
    </svg>
  );
}
