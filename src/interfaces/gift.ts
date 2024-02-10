export type GiftType = "cozinha" | "quarto" | "banheiro" | "serviço" | "sala";

export interface Image {
  url: string;
  width: number;
  height: number;
}

export interface Gift {
  id: string;
  name: string;
  price: number;
  reservedBy: string;
  link: string;
  type: GiftType;
  image: Image;
}

export interface GiftRecord {
  id: string;
  fields: {
    name: string;
    price: number;
    type: GiftType;
    link: string;
    reservedBy?: string;
    image: Image[];
  };
}

export function itsAValidGiftRecord(obj: any): obj is GiftRecord {
  const {
    id,
    fields: { name, type, link, price, image, reservedBy },
  } = obj as GiftRecord;

  if (!id || typeof id !== "string") return false;
  if (!name || typeof name !== "string") return false;
  if (!link || typeof link !== "string") return false;
  if (!price || typeof price !== "number") return false;
  if (!type || typeof type !== "string") return false;

  if (
    type !== "cozinha" &&
    type !== "quarto" &&
    type !== "banheiro" &&
    type !== "serviço" &&
    type !== "sala"
  )
    return false;

  if (!image || !Array.isArray(image)) return false;
  if (image.length === 0) return false;
  if (!image[0].url || typeof image[0].url !== "string") return false;
  if (!image[0].width || typeof image[0].width !== "number") return false;
  if (!image[0].height || typeof image[0].height !== "number") return false;

  if (reservedBy && typeof reservedBy !== "string") return false;

  return true;
}
