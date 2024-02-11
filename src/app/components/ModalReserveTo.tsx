"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dialog } from "@headlessui/react";
import { useEffect, useState } from "react";

import { formatCurrency, useGifts } from "@/contexts/GiftContext";
import Icon from "./Icon";
import Button from "./Button";
import Loading from "./Loading";
import { Gift } from "@/interfaces/gift";

export default function ModalReserveTo() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [iWantReserve, setIWantReserve] = useState(false);
  const [showRequiredError, setShowRequiredError] = useState(false);
  const [showReserveError, setShowReserveError] = useState(false);

  const { giftToReserve: gift, setGiftToReserve, reserve } = useGifts();
  const router = useRouter();

  useEffect(() => {
    if (gift) {
      setIWantReserve(false);
    }
  }, [gift]);

  const handleClick = async (gift: Gift) => {
    if (!iWantReserve) setIWantReserve(true);
    else if (!name) setShowRequiredError(true);
    else if (!gift.reservedBy && name) {
      setLoading(true);
      const goWell = await reserve({
        id: gift.id,
        resersedBy: name,
      });
      setLoading(false);

      if (!goWell) setShowReserveError(true);
    }
  };

  return (
    <Dialog
      open={!!gift}
      onClose={() => setGiftToReserve(undefined)}
      className="relative z-50"
    >
      <div className="fixed inset-0 flex w-screen items-center justify-center bg-black bg-opacity-20 px-[24px]">
        <Dialog.Panel className="w-full max-w-[450px] rounded-lg shadow-lg overflow-hidden">
          <div className="flex justify-between items-center bg-wine p-[16px] mobile:p-[24px] text-beige">
            <h2 className="text-lg mobile:text-xl text-angle font-bold ">
              Reserve esse
              <br />
              presente para você!
            </h2>
            <Button
              className="!p-[8px]"
              onClick={() => setGiftToReserve(undefined)}
            >
              <Icon id="close" className="h-[20px] w-[20px]" />
            </Button>
          </div>
          {gift && (
            <div className="bg-beige p-[16px] mobile:p-[24px] flex flex-col gap-[16px] mobile:gap-[24px]">
              <div className="border-[2px] rounded-md border-beige-medium p-[12px] flex flex-col gap-[8px] text-angle mt-0">
                <div className="p-[8px] bg-white rounded overflow-hidden relative">
                  <Image
                    src={gift.image?.url ?? ""}
                    alt={`Imagem - ${gift.name}`}
                    width={gift.image?.width}
                    height={gift.image?.height}
                    className=" mix-blend-multiply w-full h-[150px] object-contain"
                  />
                  <Button
                    className="!p-[8px] absolute top-[8px] right-[8px]"
                    onClick={() => router.push(gift.link)}
                  >
                    <p>Acessar site</p>
                  </Button>
                </div>

                <div className="truncate">
                  <h3 className="text-lg mobile:text-xl">{gift.name}</h3>
                  <p className="text-lg font-bold">
                    Preço médio: {formatCurrency(gift.price)}
                  </p>
                </div>
              </div>

              <p className="text-angle text-wine-light opacity-70 font-bold text-xs !leading-[1]">
                * Obs: Não se prendam aos valores ou loja em que encontramos
                este presente. Pode ficar à vontade para procurar variações mais
                em conta.
              </p>

              {iWantReserve && (
                <div>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-beige-medium h-[50px] rounded placeholder:text-wine-light placeholder:font-bold text-angle font-bold text-wine p-[12px] pt-[18px] w-full focus:outline-beige-dark"
                    placeholder="Seu nome"
                  />
                  {showRequiredError && (
                    <p className="text-xs text-wine-light text-angle font-bold mt-[10px]">
                      Você precisa inserir seu nome
                    </p>
                  )}
                </div>
              )}

              <div>
                <Button
                  onClick={() => handleClick(gift)}
                  disabled={!!gift.reservedBy}
                  className="text-angle w-full disabled:opacity-50 disabled:hover:bg-wine disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <Loading />
                  ) : (
                    <p>
                      {gift.reservedBy
                        ? "Produto reservado"
                        : iWantReserve
                        ? "Reservar"
                        : "Eu quero reservar"}
                    </p>
                  )}
                </Button>
                {showReserveError && (
                  <p className="text-xs text-wine-light text-angle font-bold mt-[10px]">
                    Houve um erro! Avise o noivo para resolver.
                  </p>
                )}
              </div>
            </div>
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
