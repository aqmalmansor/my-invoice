import {
  Flex,
  Text,
  TextArea as RadixTextArea,
  TextAreaProps as RadixTextAreaProps,
} from "@radix-ui/themes";
import { useFormikContext } from "formik";
import { FC } from "react";

import {
  cn,
  getErrorFieldProps,
  getErrorInputStyle,
  getErrorLabelStyle,
  getErrorMessageStyle,
} from "../../lib/utils";

interface TextAreaProps extends RadixTextAreaProps {
  name: string;
  label?: string;
  helperText?: string;
}

export const TextArea: FC<TextAreaProps> = ({
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
      <RadixTextArea
        {...field}
        className={cn([getErrorInputStyle(hasFieldError)], "min-h-[100px]")}
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
