"use client";
import { useEffect, useState } from "react";

import { useGifts } from "@/contexts/GiftContext";

import Gift from "../components/Gift";
import Loading from "../components/Loading";
import ModalReserveTo from "../components/ModalReserveTo";
import {
  Gift as IGift,
  giftTypes,
  translatedGiftType,
} from "@/interfaces/gift";

export default function Gifts() {
  const { gifts, list, didIReserveThisGift } = useGifts();

  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<IGift["type"]>();

  const [filteredGifts, setFilteredGifts] = useState<IGift[]>([]);

  const loadGifts = async () => {
    await list();
  };

  useEffect(() => {
    loadGifts();

    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  useEffect(() => {
    setFilteredGifts(
      gifts
        .filter((gift) => (filter ? gift.type === filter : true))
        .sort((a, b) => {
          if (didIReserveThisGift(a) && !didIReserveThisGift(b)) return -1;
          if (!didIReserveThisGift(a) && didIReserveThisGift(b)) return 1;
          if (!a.reservedBy && b.reservedBy) return -1;
          if (a.reservedBy && !b.reservedBy) return 1;
          return 0;
        })
    );
  }, [filter, gifts]);

  return (
    <section className="flex flex-wrap gap-2 container pb-[50px]">
      {loading ? (
        <div className="flex flex-col gap-[8px] justify-start mobile:justify-center h-[200px] mobile:h-[300px] laptop:h-[250px] text-beige items-center laptop:text-wine laptop:items-start w-full">
          <Loading size="md" className="tablet:!mx-0" />
          <h3 className="text-angle font-bold text-center">
            Buscando presentes...
          </h3>
        </div>
      ) : (
        <>
          <div className="w-full flex flex-wrap justify-center laptop:justify-start laptop:max-w-[40%] mb-[32px] gap-[8px]">
            {giftTypes.map((t) => (
              <span
                key={t}
                onClick={() => {
                  if (filter === t) setFilter(undefined);
                  else setFilter(t);
                }}
                className={`block bg-wine-light laptop:bg-beige-medium text-beige laptop:text-wine-light text-sm border-[2px] py-[6px] px-[12px] rounded cursor-pointer ${
                  filter === t
                    ? "border-green laptop:border-wine-light"
                    : "border-wine-light laptop:border-beige-medium"
                }`}
              >
                {translatedGiftType[t]}
              </span>
            ))}
          </div>
          <ul className="w-full grid grid-cols-2 tablet:grid-cols-3 laptop:grid-cols-4 gap-[8px] tablet:gap-[16px] min-h-[250px]">
            {filteredGifts.length > 0 ? (
              filteredGifts.map((gift, index) => (
                <li key={`gift-${index}`} className="col-span-1">
                  <Gift {...gift} />
                </li>
              ))
            ) : (
              <p>Nenhum presente cadastrado nessa área...</p>
            )}
          </ul>
        </>
      )}
      <ModalReserveTo reloadGifts={loadGifts} />
    </section>
  );
}
