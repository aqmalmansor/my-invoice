import dayjs from "dayjs";
import { DateType } from "react-tailwindcss-datepicker";

import { currencies } from "../constants";

export const getCurrencyAffix = (currency: string): string => {
  const currLabel = currencies
    .find((c) => c.value === currency)
    ?.label.match(/\((.*?)\)/);

  return currLabel ? currLabel[1] : "RM";
};

export const formatCurrency = (
  value: number,
  currency: string,
  hideCurrency = false
): string => {
  const affix = getCurrencyAffix(currency);

  const amount = parseFloat(value.toString()).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return hideCurrency ? amount : affix + " " + amount;
};

const DEFAULT_DATE_FORMAT = "DD/MM/YYYY";

export const formatDate = (date?: DateType): string => {
  if (!date) return "-";

  const isValid = dayjs(date).isValid();

  return isValid ? dayjs(date).format(DEFAULT_DATE_FORMAT) : "-";
};
