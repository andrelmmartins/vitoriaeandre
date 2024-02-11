import { formatCurrency, useGifts } from "@/contexts/GiftContext";
import { Gift as GiftProps } from "@/interfaces/gift";
import Image from "next/image";

export default function Gift(gift: GiftProps) {
  const { setGiftToReserve, didIReserveThisGift } = useGifts();

  const { name, image, reservedBy, price } = gift;

  const reservedToMe = didIReserveThisGift(gift);

  return (
    <div
      className="p-[8px] tablet:p-[16px] rounded-lg bg-beige-medium h-full w-full cursor-pointer relative overflow-hidden flex flex-col"
      onClick={() => setGiftToReserve(gift)}
    >
      {reservedBy && (
        <>
          <span className="bg-wine absolute top-[9%] left-[-15%] h-[24px] tablet:h-[30px] leading-none w-[120%] text-beige rotate-[-15deg] px-[20%] z-[1] text-sm tablet:text-md desktop:text-lg hidden mobile:flex items-center">
            {`Reservado para ${reservedToMe ? "Você" : reservedBy}`}
          </span>
          <span className="bg-wine absolute top-[9%] left-[-15%] h-[24px] tablet:h-[30px] leading-none w-[120%] text-beige rotate-[-15deg] px-[20%] z-[1] text-sm tablet:text-md desktop:text-lg flex mobile:hidden items-center">
            {`Reservado`}
          </span>
        </>
      )}
      <div
        className="bg-white h-[150px] tablet:h-[250px] p-[8px] rounded overflow-hidden shrink-0"
        style={{ opacity: reservedToMe || !reservedBy ? 1 : 0.5 }}
      >
        <Image
          src={image.url}
          width={image.width}
          height={image.height}
          className="h-full w-full object-contain mix-blend-multiply z-[5]"
          alt={`Imagem do Produto - ${name}`}
          fetchPriority="low"
          loading="lazy"
        />
      </div>
      <div
        className="mt-[8px] tablet:mt-[16px] text-angle flex flex-col justify-between h-full"
        style={{ opacity: reservedToMe || !reservedBy ? 1 : 0.5 }}
      >
        <h3 className="text-sm !leading-tight mobile:text-lg tablet:text-xl font-bold w-full">
          {name}
        </h3>
        <p className="text-sm font-bold text-wine-light">
          Preço médio: {formatCurrency(price)}
        </p>
      </div>
    </div>
  );
}
