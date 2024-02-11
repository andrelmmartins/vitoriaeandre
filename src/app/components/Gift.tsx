import { useGifts } from "@/contexts/GiftContext";
import { Gift as GiftProps } from "@/interfaces/gift";
import Image from "next/image";

export default function Gift(gift: GiftProps) {
  const { setGiftToReserve } = useGifts();

  const { name, image } = gift;

  const handleClick = () => {
    if (gift.reservedBy) console.log(gift);
    else setGiftToReserve(gift);
  };

  return (
    <div
      className="p-4 rounded-lg bg-beige h-full w-full truncate cursor-pointer"
      onClick={handleClick}
      style={{ opacity: gift.reservedBy ? 0.5 : 1 }}
    >
      <div className="bg-white p-[8px]">
        <Image
          src={image.url}
          width={image.width}
          height={image.height}
          className="h-[300px] w-full object-contain mix-blend-multiply "
          alt={`Imagem do Produto - ${name}`}
        />
      </div>
      <h3 className="text-2xl">{name}</h3>
    </div>
  );
}
