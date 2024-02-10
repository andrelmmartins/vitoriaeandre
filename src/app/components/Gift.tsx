import { useGifts } from "@/contexts/GiftContext";
import { Gift as GiftProps } from "@/interfaces/gift";
import Image from "next/image";

export default function Gift({ name, image }: GiftProps) {
  return (
    <div className="p-4 rounded-lg  bg-beige-medium h-full w-full">
      <Image
        src={image.url}
        width={image.width}
        height={image.height}
        className="h-[20rem] w-full object-cover"
        alt={`Imagem do Produto - ${name}`}
      />
      <h3 className="text-2xl">{name}</h3>
    </div>
  );
}
