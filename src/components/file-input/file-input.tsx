import { ChangeEvent, FC, useRef } from "react";
import { Button, Flex, Text, TextField } from "@radix-ui/themes";
import { useFormikContext } from "formik";

import {
  getErrorFieldProps,
  getErrorLabelStyle,
  getErrorMessageStyle,
} from "@app/lib/utils";

interface FileInputProps extends TextField.RootProps {
  name: string;
  label?: string;
  helperText?: string;
}

export const FileInput: FC<FileInputProps> = ({
  name,
  label,
  helperText = "Only *.jpg, *.jpeg, *.png",
  ...props
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
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

  const handleImageUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleClearImage = () => {
    helpers.setValue(null);
    if (fileInputRef?.current?.value) {
      fileInputRef.current.value = "";
    }
  };

  const handleViewImage = () =>
    window.open(field?.value, "_blank", "noopener,noreferrer");

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      console.log(file);

      if (["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
        helpers.setValue(URL.createObjectURL(file));
      } else {
        helpers.setError("Only PNG, JPG, and JPEG files are allowed");
      }
    }
  };

  return (
    <>
      <Flex direction="row" gap="1" mb="2" align={"center"}>
        {label && (
          <Text weight="medium" className={getErrorLabelStyle(hasFieldError)}>
            {label}
            {props.required && "*"}
          </Text>
        )}
        <Button type="button" onClick={handleImageUploadClick}>
          Upload
        </Button>
        {field.value && (
          <>
            <Button type="button" onClick={handleViewImage} variant="outline">
              <div className="truncate max-w-[100px]">View</div>
            </Button>
            <Button type="button" onClick={handleClearImage} color="red">
              Clear
            </Button>
          </>
        )}
        {(hasFieldError || helperText) && (
          <Text className={getErrorMessageStyle(hasFieldError)} size="1">
            {hasFieldError ? errorHelperText : helperText}
          </Text>
        )}
        <input
          ref={fileInputRef}
          type="file"
          style={{ display: "none" }}
          onChange={onChange}
        />
      </Flex>
    </>
  );
};
