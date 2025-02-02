import { Option, QuantityEnum } from "../entities";
import { mapEnumToOptions } from "../utils";

export const DEFAULT_MYR_SST = 6;

export const DEBUG = false;

export const INVOICE_FORM_VALUES_KEY = "invoice-form-values";

export const QUANTITY_OPTIONS: Option[] = mapEnumToOptions(QuantityEnum);

export * from "./currencies";
export * from "./error-message";
