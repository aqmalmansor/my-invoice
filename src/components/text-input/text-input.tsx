import { Flex, Text, TextField } from "@radix-ui/themes";
import { useFormikContext } from "formik";
import { FC } from "react";

import {
  cn,
  getErrorFieldProps,
  getErrorInputStyle,
  getErrorLabelStyle,
  getErrorMessageStyle,
} from "../../lib/utils";

interface TextInputProps extends TextField.RootProps {
  name: string;
  label?: string;
  helperText?: string;
}

export const TextInput: FC<TextInputProps> = ({
  name,
  label,
  helperText,
  defaultValue = "",
  ...props
}) => {
  const { submitCount, getFieldMeta, getFieldProps } = useFormikContext();
  const [meta, field] = [getFieldMeta(name), getFieldProps(name)];
  const { error, helperText: errorHelperText } = getErrorFieldProps(
    meta,
    submitCount
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
      />
      {(hasFieldError || helperText) && (
        <Text className={getErrorMessageStyle(hasFieldError)}>
          {hasFieldError ? errorHelperText : helperText}
        </Text>
      )}
    </Flex>
  );
};
