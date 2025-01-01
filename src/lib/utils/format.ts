import { currencies } from "../constants";

export const formatCurrency = (value: number, currency: string): string => {
  const currLabel = currencies
    .find((c) => c.value === currency)
    ?.label.match(/\((.*?)\)/);

  return (
    (currLabel ? currLabel[1] : "RM") +
    " " +
    parseFloat(value.toString()).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
};
