export const formatCurrency = (value: number, currency: string): string =>
  currency +
  " " +
  parseFloat(value.toString()).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
