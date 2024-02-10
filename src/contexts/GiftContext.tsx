"use client";

import { createContext, useContext, useState } from "react";

import * as airtable from "@/services/airtable";
import { Gift, itsAValidGiftRecord } from "@/interfaces/gift";

interface Props {
  gifts: Gift[];

  list: () => Promise<void>;
  reserve: (props: airtable.ReserveProps) => Promise<void>;
}

const GiftContext = createContext({} as Props);

export default function GiftProvider(props: { children: React.ReactNode }) {
  const [gifts, setGifts] = useState<Gift[]>([]);

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
      const response = await airtable.reserve(props);
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <GiftContext.Provider
      value={{
        gifts,

        list,
        reserve,
      }}
    >
      {props.children}
    </GiftContext.Provider>
  );
}

export const useGifts = () => useContext(GiftContext);
