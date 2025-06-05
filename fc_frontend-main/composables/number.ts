export const numberFormat = (valor: number, options: any) => {
  if (options.style == "currency") {
    options.currency = "BRL";
  }

  return new Intl.NumberFormat("pt-BR", options).format(valor);
};
