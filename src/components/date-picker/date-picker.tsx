import { FC } from "react";
import { Flex, Text } from "@radix-ui/themes";
import { useFormikContext } from "formik";
import TailwindDatePicker, {
  DatepickerType,
} from "react-tailwindcss-datepicker";

import {
  cn,
  getErrorFieldProps,
  getErrorInputStyle,
  getErrorLabelStyle,
  getErrorMessageStyle,
} from "@app/lib/utils";

interface DatePickerProps extends Omit<DatepickerType, "onChange" | "value"> {
  name: string;
  label?: string;
  helperText?: string;
  defaultValue?: Nullable<Date>;
}

export const DatePicker: FC<DatePickerProps> = ({
  name,
  label,
  helperText,
  ...props
}) => {
  const { submitCount, getFieldMeta, getFieldProps, getFieldHelpers } =
    useFormikContext();

  const [meta, field, helpers] = [
    getFieldMeta(name),
    getFieldProps(name),
    getFieldHelpers(name),
  ];

  const { error, helperText: errorHelperText } = getErrorFieldProps(
    meta,
    submitCount,
  );

  const hasFieldError = !!(error && errorHelperText);

  return (
    <Flex direction="column" gap="1" mb="2">
      {label && (
        <Text weight="medium" className={getErrorLabelStyle(hasFieldError)}>
          {label}
          {props.required && "*"}
        </Text>
      )}
      <TailwindDatePicker
        primaryColor="blue"
        displayFormat="DD/MM/YYYY"
        inputClassName={(cls) => {
          const newClassname = cls
            .split(" ")
            .filter((c) => !c.includes("dark"))
            .filter((c) => !c.includes("focus"))
            .filter((c) => !c.includes("border"))
            .join(" ");

          return cn([
            newClassname,
            getErrorInputStyle(hasFieldError),
            "border-2 py-2 px-3",
          ]);
        }}
        value={field.value ?? null}
        onChange={(value) => {
          helpers.setValue(value);
          helpers.setTouched(true);
        }}
      />
      {(hasFieldError || helperText) && (
        <Text className={getErrorMessageStyle(hasFieldError)} size="1">
          {hasFieldError ? meta.error : helperText}
        </Text>
      )}
    </Flex>
  );
};
