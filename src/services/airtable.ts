import axios from "axios";

import { Gift } from "@/interfaces/gift";

const base = process.env.NEXT_PUBLIC_AIRTABLE_BASE;
const table = process.env.NEXT_PUBLIC_AIRTABLE_TABLE;
const personalToken = process.env.NEXT_PUBLIC_AIRTABLE_TOKEN;

const api = axios.create({
  baseURL: `https://api.airtable.com/v0/${base}/${table}`,
  headers: {
    Authorization: `Bearer ${personalToken}`,
  },
});

export const list = async () => {
  return api.get("/", {
    params: {
      sort: [{ field: "price", direction: "asc" }], // sort by lower price
    },
  });
};

export interface ReserveProps {
  id: Gift["id"];
  resersedBy: Gift["reservedBy"];
}

export const reserve = async (props: ReserveProps) => {
  return api.patch(`/${props.id}/`, {
    fields: {
      reservedBy: props.resersedBy,
    },
  });
};
