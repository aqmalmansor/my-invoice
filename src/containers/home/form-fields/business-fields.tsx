import { FC } from "react";
import { Text } from "@radix-ui/themes";

import { TextArea, TextInput } from "@app/components";

export const BusinessFields: FC = () => {
  return (
    <>
      <Text
        weight="bold"
        size="6"
        className="pb-2 mb-3 border-b-2 grid col-span-2"
      >
        Business details
      </Text>
      <div className="grid col-span-2">
        <TextInput
          required
          name="business.name"
          label="Business Name"
          helperText="Please enter your company name"
        />
      </div>
      <div className="grid col-span-2 grid-cols-2 gap-4">
        <TextInput
          required
          name="business.phone"
          label="Business Phone"
          helperText="Please enter your company phone number"
        />
        <TextInput
          type="email"
          name="business.email"
          label="Business Email"
          helperText="Please enter your company email"
        />
      </div>
      <div className="grid col-span-2">
        <TextArea
          required
          name="business.address"
          label="Business Address"
          helperText="Please enter your company address"
        />
      </div>
    </>
  );
};
