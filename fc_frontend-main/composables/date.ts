import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

export const dateFormat = (date: Date | string, formato: string) => {
  if (typeof date == "string") {
    date = parseISO(date);
  }

  return format(date, formato, { locale: ptBR });
};
