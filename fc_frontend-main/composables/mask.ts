import { Mask } from "maska";

export const mask = (value: string, mascara: string | string[]) => {
  const mask = new Mask({ mask: mascara });
  return mask.masked(value);
};

export const unMask = (value: string, mascara: string | string[]) => {
  const mask = new Mask({ mask: mascara });
  return mask.unmasked(value);
};
