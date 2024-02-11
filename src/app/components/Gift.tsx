import { useGifts } from "@/contexts/GiftContext";
import { Gift as GiftProps } from "@/interfaces/gift";
import Image from "next/image";
import Loading from "./Loading";

export default function Gift(gift: GiftProps) {
  const { setGiftToReserve, didIReserveThisGift } = useGifts();

  const { name, image, reservedBy } = gift;

  return (
    <div
      className="p-4 rounded-lg bg-beige h-full w-full truncate cursor-pointer relative"
      onClick={() => setGiftToReserve(gift)}
      style={{ opacity: gift.reservedBy ? 0.5 : 1 }}
    >
      {reservedBy && (
        <span>
          {didIReserveThisGift(gift)
            ? "Você reservou esse produto"
            : "Produto reservado"}
        </span>
      )}
      <div className="bg-white p-[8px] flex items-center justify-center">
        <Image
          src={image.url}
          width={image.width}
          height={image.height}
          className="h-[300px] w-full object-contain mix-blend-multiply z-[5]"
          alt={`Imagem do Produto - ${name}`}
          fetchPriority="low"
          loading="lazy"
        />
        <Loading className="text-white-medium" />
      </div>
      <h3 className="text-2xl">{name}</h3>
    </div>
  );
}
