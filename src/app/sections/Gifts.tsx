"use client";
import { useEffect, useState } from "react";

import { useGifts } from "@/contexts/GiftContext";

import Gift from "../components/Gift";
import Loading from "../components/Loading";
import ModalReserveTo from "../components/ModalReserveTo";

export default function Gifts() {
  const { gifts, list, didIReserveThisGift } = useGifts();
  const [loading, setLoading] = useState(true);

  const loadGifts = async () => {
    await list();
  };

  useEffect(() => {
    loadGifts();

    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  const sortedGifts = gifts.sort((a, b) => {
    if (didIReserveThisGift(a) && !didIReserveThisGift(b)) return -1;
    if (!didIReserveThisGift(a) && didIReserveThisGift(b)) return 1;
    if (!a.reservedBy && b.reservedBy) return -1;
    if (a.reservedBy && !b.reservedBy) return 1;
    return 0;
  });

  return (
    <section className="flex flex-wrap gap-2 container">
      {loading ? (
        <div className="flex flex-col gap-[8px] justify-start mobile:justify-center h-[200px] mobile:h-[300px] laptop:h-[350px] text-beige items-center laptop:text-wine laptop:items-start w-full">
          <Loading size="md" className="mx-0" />
          <h3 className="text-angle font-bold text-center">
            Buscando presentes...
          </h3>
        </div>
      ) : (
        <ul className="w-full grid grid-cols-1 mobile:grid-cols-2 tablet:grid-cols-3 laptop:grid-cols-4 gap-4">
          {sortedGifts.map((gift, index) => (
            <li key={`gift-${index}`} className="col-span-1">
              <Gift {...gift} />
            </li>
          ))}
        </ul>
      )}
      <ModalReserveTo reloadGifts={loadGifts} />
    </section>
  );
}
