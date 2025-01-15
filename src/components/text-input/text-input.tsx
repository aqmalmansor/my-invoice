import { FC } from "react";
import { Flex, Text, TextField } from "@radix-ui/themes";
import { useFormikContext } from "formik";

import {
  cn,
  getErrorFieldProps,
  getErrorInputStyle,
  getErrorLabelStyle,
  getErrorMessageStyle,
} from "@app/lib/utils";

interface TextInputProps extends TextField.RootProps {
  name: string;
  label?: string;
  helperText?: string;
  startAdornment?: React.ReactNode;
}

export const TextInput: FC<TextInputProps> = ({
  name,
  label,
  helperText,
  defaultValue = "",
  startAdornment,
  ...props
}) => {
  const { submitCount, getFieldMeta, getFieldProps } = useFormikContext();

  const [meta, field] = [getFieldMeta(name), getFieldProps(name)];

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
      <TextField.Root
        {...field}
        className={cn([getErrorInputStyle(hasFieldError), "h-auto"])}
        type="text"
        value={
          field.value === undefined || field.value === null
            ? defaultValue
            : field.value
        }
        {...props}
      >
        {startAdornment && <TextField.Slot>{startAdornment}</TextField.Slot>}
      </TextField.Root>
      {(hasFieldError || helperText) && (
        <Text className={getErrorMessageStyle(hasFieldError)} size="1">
          {hasFieldError ? errorHelperText : helperText}
        </Text>
      )}
    </Flex>
  );
};
