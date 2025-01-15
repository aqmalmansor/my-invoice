import { Option } from "../entities";

export const mapEnumToOptions = <T>(enums: T): Option[] =>
  Object.entries(enums as unknown as Record<string, string>).map(
    ([key, value]) => ({
      value: key,
      label: value as string,
    }),
  );

export * from "./format";
export * from "./formik";
export * from "./styles";
export * from "./tailwind-merge";
