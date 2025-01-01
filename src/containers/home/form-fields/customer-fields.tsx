import { FC } from "react";
import { Text } from "@radix-ui/themes";

import { TextArea, TextInput } from "../../../components";

export const CustomerFields: FC = () => {
  return (
    <>
      <Text weight="bold" size="4">
        Customer
      </Text>
      <TextInput
        required
        name="client.name"
        label="Customer Name"
        helperText="Please enter your customer name"
      />
      <TextInput
        name="client.email"
        label="Customer Email"
        helperText="Please enter your customer email"
        type="email"
      />
      <TextArea
        required
        name="client.address"
        label="Customer Address"
        helperText="Please enter your customer address"
      />
    </>
  );
};
