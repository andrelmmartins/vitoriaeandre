import { formatCurrency, useGifts } from "@/contexts/GiftContext";
import { Gift as GiftProps } from "@/interfaces/gift";

export const normalizeReservedBy = (reservedBy: string) => {
  return reservedBy.trim()
}

export default function Gift(gift: GiftProps) {
  const { setGiftToReserve, didIReserveThisGift } = useGifts();

  const { name, image, reservedBy, price } = gift;

  const reservedToMe = didIReserveThisGift(gift);

  const isReserved = normalizeReservedBy(reservedBy).length > 1 || reservedToMe

  return (
    <div
      className="p-[8px] tablet:p-[16px] rounded-lg bg-beige-medium h-full w-full cursor-pointer relative overflow-hidden flex flex-col"
      onClick={() => setGiftToReserve(gift)}
    >
      {isReserved && (
          <span className="bg-wine shadow-md absolute top-[9%] left-[-15%] min-h-[35px] h-fit py-2 !leading-none w-[125%] text-beige rotate-[-15deg] px-[20%] z-[1] text-[11px] micro:text-sm tablet:text-md desktop:text-lg flex items-center">
            {`Reservado para ${reservedToMe ? "Você" : reservedBy}`}
          </span>
      )}
      <div
        className="bg-white h-[150px] tablet:h-[250px] p-[8px] rounded overflow-hidden shrink-0"
        style={{ opacity: !isReserved ? 1 : 0.5 }}
      >
        <img
          src={image.url}
          width={image.width / 3}
          height={image.height / 3}
          className="h-full w-full object-contain mix-blend-multiply z-[5] rounded overflow-hidden"
          alt={`Imagem do Produto - ${name}`}
          fetchPriority="low"
          loading="lazy"
        />
      </div>
      <div
        className="mt-[8px] tablet:mt-[16px] text-angle flex flex-col justify-between h-full"
        style={{ opacity: !isReserved ? 1 : 0.5 }}
      >
        <h3 className="!leading-tight text-[12px] micro:text-sm mobile:text-lg desktop:text-xl font-bold w-full">
          {name}
        </h3>
        <p className="text-sm font-bold text-wine-light hidden mobile:block">
          Preço médio: {formatCurrency(price)}
        </p>
        <p className="text-sm font-bold text-wine-light block mobile:hidden">
          {formatCurrency(price)}
        </p>
      </div>
    </div>
  );
}
