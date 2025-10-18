import { FC } from "react";
import { Text } from "@radix-ui/themes";

import { DatePicker, TextInput } from "@app/components";

export const InvoiceFields: FC = () => {
  return (
    <>
      <Text
        weight="bold"
        size="6"
        className="pb-2 mb-3 border-b-2 grid col-span-2"
      >
        Invoice Basic Information
      </Text>
      <div className="grid md:grid-cols-3 md:gap-4">
        <TextInput
          id="invoiceNumber"
          name="invoiceNumber"
          label="Invoice Number"
          helperText="Please enter your invoice number"
          required
        />
        <DatePicker
          name="invoiceDate"
          label="Issue Date and Due Date"
          helperText="Please enter your invoice issue and due date"
        />
        <TextInput
          name="invoiceRef"
          label="Invoice Reference"
          helperText="Please enter your invoice reference number"
        />
      </div>
    </>
  );
};
