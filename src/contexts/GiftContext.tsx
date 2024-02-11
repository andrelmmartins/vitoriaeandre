"use client";

import { createContext, useContext, useEffect, useState } from "react";

import * as airtable from "@/services/airtable";
import { Gift, itsAValidGiftRecord } from "@/interfaces/gift";

interface Props {
  gifts: Gift[];

  giftToReserve: Gift | undefined;
  setGiftToReserve: (gift: Gift | undefined) => void;

  list: () => Promise<void>;
  reserve: (props: airtable.ReserveProps) => Promise<boolean>;
}

const GiftContext = createContext({} as Props);

export default function GiftProvider(props: { children: React.ReactNode }) {
  const [gifts, setGifts] = useState<Gift[]>([]);

  const [giftToReserve, setGiftToReserve] = useState<Gift | undefined>();
  const [giftsThatIReserve, setGiftsThatIReserve] = useState<Gift["id"][]>([]);

  async function list() {
    try {
      const response = await airtable.list();

      if (
        response &&
        response.data &&
        response.data.records &&
        Array.isArray(response.data.records)
      ) {
        const gifts: Gift[] = [];

        response.data.records.forEach((record: any) => {
          if (itsAValidGiftRecord(record)) {
            gifts.push({
              id: record.id,
              name: record.fields.name,
              link: record.fields.link,
              price: record.fields.price,
              type: record.fields.type,
              reservedBy: record.fields.reservedBy ?? "",
              image: {
                url: record.fields.image[0].url,
                width: record.fields.image[0].width,
                height: record.fields.image[0].height,
              },
            });
          }
        });

        setGifts(gifts);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function reserve(props: airtable.ReserveProps) {
    try {
      localStorage.setItem(
        localStorageItem,
        JSON.stringify({
          giftsThatIReserve: [...giftsThatIReserve, props.id],
        })
      );

      const response = await airtable.reserve(props);

      if (response && response.data && itsAValidGiftRecord(response.data)) {
        const record = response.data;
        setGiftToReserve({
          id: record.id,
          name: record.fields.name,
          link: record.fields.link,
          price: record.fields.price,
          type: record.fields.type,
          reservedBy: record.fields.reservedBy ?? "",
          image: {
            url: record.fields.image[0].url,
            width: record.fields.image[0].width,
            height: record.fields.image[0].height,
          },
        });

        return true;
      }

      return false;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  const localStorageItem = "vitoriaeandre-gifts-that-i-reserve";

  useEffect(() => {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(localStorageItem);

      try {
        if (data) {
          const json = JSON.parse(data);
          if (
            json &&
            json.giftsThatIReserve &&
            Array.isArray(json.giftsThatIReserve)
          ) {
            const giftsThatIReserve = json.giftsThatIReserve.filter(
              (g: any) => typeof g === "string"
            );

            setGiftToReserve(giftsThatIReserve);
          }
        }
      } catch (e) {}
    }

    setGiftToReserve(undefined);
  }, []);

  return (
    <GiftContext.Provider
      value={{
        gifts,

        giftToReserve,
        setGiftToReserve,

        list,
        reserve,
      }}
    >
      {props.children}
    </GiftContext.Provider>
  );
}

export const useGifts = () => useContext(GiftContext);

export const formatCurrency = (value = 0) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};
