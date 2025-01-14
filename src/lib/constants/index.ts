import { Option, QuantityEnum } from "../entities";

export const DEFAULT_MYR_SST = 6;

export const DEBUG = false;

export const QUANTITY_OPTIONS: Option[] = Object.entries(QuantityEnum).map(
  ([key, value]) => ({
    value: key,
    label: value,
  })
) as Option[];

export * from "./currencies";
export * from "./error-message";
