import Icon from "@/app/components/Icon";

interface Props {
  text: string;
  onClick?: () => void;
  headSquare?: boolean;
  selected?: boolean;
  logo?: boolean;
}

export default function BingoSquare(props: Props) {
  return (
    <div
      onClick={props.onClick}
      className={`h-16 w-16 tablet:h-20 tablet:w-20 flex items-center justify-center text-3xl ${
        props.headSquare || props.logo
          ? "bg-wine-medium text-beige text-4xl"
          : "bg-beige text-wine-medium border border-wine-medium cursor-pointer"
      }`}
    >
      {props.logo ? (
        <Icon id="logo" className="h-12" />
      ) : (
        <span
          className={`flex items-center justify-center h-12 w-12 tablet:h-16 tablet:w-16 rounded-full transtion-all duration-300 ${
            props.selected ? "bg-beige-dark text-wine" : ""
          }`}
        >
          {props.text}
        </span>
      )}
    </div>
  );
}
