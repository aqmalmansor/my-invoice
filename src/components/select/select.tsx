import { FC } from "react";
import { Flex, Select as RadixSelect, Text } from "@radix-ui/themes";
import { useFormikContext } from "formik";

import { Option } from "@app/lib/entities";
import {
  cn,
  getErrorInputStyle,
  getErrorLabelStyle,
  getErrorMessageStyle,
} from "@app/lib/utils";

interface SelectProps extends RadixSelect.RootProps {
  name: string;
  label?: string;
  helperText?: string;
  defaultValue?: string;
  placeholder?: string;
  options: Option[];
}

export const Select: FC<SelectProps> = ({
  name,
  label,
  helperText,
  options,
  defaultValue,
  placeholder,
  ...props
}) => {
  const { getFieldMeta, getFieldProps, getFieldHelpers } = useFormikContext();

  const [meta, field, helpers] = [
    getFieldMeta(name),
    getFieldProps(name),
    getFieldHelpers(name),
  ];

  const hasFieldError = !!meta.error && !!meta.touched;

  return (
    <Flex direction="column" gap="1" mb="2" justify="center">
      {label && (
        <Text weight="medium" className={getErrorLabelStyle(hasFieldError)}>
          {label}
          {props.required && "*"}
        </Text>
      )}
      <RadixSelect.Root
        value={
          field.value === undefined || field.value === null
            ? defaultValue
            : field.value
        }
        onValueChange={(value) => helpers.setValue(value)}
      >
        <RadixSelect.Trigger
          variant="surface"
          placeholder={placeholder ?? "Select an option"}
          className={cn([
            getErrorInputStyle(hasFieldError),
            "rounded-md px-3 py-5 border-2 min-w-[80px]",
            hasFieldError
              ? "[box-shadow:inset_0_0_0_1.5px_rgb(300_100_100_/_var(--tw-bg-opacity,_1))]"
              : "[box-shadow:inset_0_0_0_1.5px_rgb(183_193_205_/_var(--tw-bg-opacity,_1))]",
          ])}
        />
        <RadixSelect.Content>
          {options.map((option) => (
            <RadixSelect.Item key={JSON.stringify(option)} value={option.value}>
              {option.label}
            </RadixSelect.Item>
          ))}
        </RadixSelect.Content>
      </RadixSelect.Root>
      {(hasFieldError || helperText) && (
        <Text className={getErrorMessageStyle(hasFieldError)} size="1">
          {hasFieldError ? meta.error : helperText}
        </Text>
      )}
    </Flex>
  );
};
