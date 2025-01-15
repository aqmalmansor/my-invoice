import { useCallback } from "react";

import { DEFAULT_CURRENCY } from "@app/lib/constants";
import { formatCurrency, getCurrencyAffix } from "@app/lib/utils";

import { FormValuesType } from "../config";

export const useCalculateInvoice = (
  invoiceItems: FormValuesType["invoiceItems"],
  tax: FormValuesType["tax"],
  currencyCode: FormValuesType["currency"],
) => {
  const curr = currencyCode ?? DEFAULT_CURRENCY;

  const subTotalPrice = useCallback(() => {
    return invoiceItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  }, [invoiceItems]);

  const totalTaxPrice = useCallback(
    () => (tax ? (subTotalPrice() * (tax ?? 0)) / 100 : 0),
    [tax, subTotalPrice],
  );

  const totalPriceWithTax = useCallback(
    () => subTotalPrice() + totalTaxPrice(),
    [subTotalPrice, totalTaxPrice],
  );

  const formatPrice = (price: number, hideCurrency?: boolean) =>
    formatCurrency(price, curr, hideCurrency);

  return {
    subTotalPrice: formatCurrency(subTotalPrice(), curr),
    totalTaxPrice: formatCurrency(totalTaxPrice(), curr),
    totalPriceWithTax: formatCurrency(totalPriceWithTax(), curr),
    currencyAffix: getCurrencyAffix(curr),
    formatPrice,
  };
};
