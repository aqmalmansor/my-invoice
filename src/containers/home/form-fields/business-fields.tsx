import { Text } from "@radix-ui/themes";
import { FC } from "react";

import { TextArea, TextInput } from "../../../components";

export const BusinessFields: FC = () => {
  return (
    <>
      <Text weight="bold" size="4">
        Business
      </Text>
      <TextInput
        required
        name="business.name"
        label="Business Name"
        helperText="Please enter your company name"
      />
      <TextInput
        required
        name="business.phone"
        label="Business Phone"
        helperText="Please enter your invoice number"
        type="number"
      />
      <TextInput
        type="email"
        name="business.email"
        label="Business Email"
        helperText="Please enter your company email"
      />
      <TextArea
        required
        name="business.address"
        label="Business Address"
        helperText="Please enter your company address"
      />
    </>
  );
};
