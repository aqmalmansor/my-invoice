export interface InvoiceItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Option {
  label: string;
  value: string;
}

export enum QuantityEnum {
  NULL = "",
  PCS = "piece(s)",
  LT = "litre(s)",
  ML = "mililiter(s)",
  MTR = "meter(s)",
  KG = "kilo(s)",
  CM = "centimeter(s)",
  UNIT = "unit(s)",
  H = "hour(s)",
}

export interface PaymentInformation {
  bankName: Nullable<string>;
  bankAccHolderName: Nullable<string>;
  bankAccHolderNumber: Nullable<number>;
  swiftCode?: Nullable<string>;
}
