"use client";
import { useEffect, useState } from "react";

import { useGifts } from "@/contexts/GiftContext";

import Gift from "../components/Gift";
import Loading from "../components/Loading";

export default function Gifts() {
  const { gifts, list } = useGifts();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    list();
    setLoading(false);
  }, []);

  return (
    <section className="flex flex-wrap gap-2 container">
      {loading ? (
        <Loading />
      ) : (
        <ul className="grid grid-cols-4 gap-4">
          {gifts.map((gift, index) => (
            <li key={`gift-${index}`} className="col-span-1">
              <Gift {...gift} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
