import { useFormikContext } from "formik";
import { FC } from "react";
import TailwindDatePicker, {
  DatepickerType,
} from "react-tailwindcss-datepicker";
import dayjs from "dayjs";
import { Flex, Text } from "@radix-ui/themes";

import {
  cn,
  getErrorInputStyle,
  getErrorLabelStyle,
  getErrorMessageStyle,
} from "../../lib/utils";

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
  defaultValue,
  ...props
}) => {
  const { getFieldMeta, getFieldProps, getFieldHelpers } = useFormikContext();

  const [meta, field, helpers] = [
    getFieldMeta(name),
    getFieldProps(name),
    getFieldHelpers(name),
  ];

  const hasFieldError = !!meta.error;

  return (
    <Flex direction="column" gap="1" mb="2">
      {label && (
        <Text weight="medium" className={getErrorLabelStyle(hasFieldError)}>
          {label}
          {props.required && "*"}
        </Text>
      )}
      <TailwindDatePicker
        asSingle
        useRange={false}
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
        value={field.value === undefined ? defaultValue : field.value}
        onChange={(value) => {
          const dateValue = value?.startDate;
          const isDateInputValid = dateValue && dayjs(dateValue).isValid();

          helpers.setValue(isDateInputValid ? value : null);
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