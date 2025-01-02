import { FC } from "react";
import { Text } from "@radix-ui/themes";

import { DatePicker, TextInput } from "../../../components";

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
      <div className="grid grid-cols-3 gap-4">
        <TextInput
          name="invoiceNumber"
          label="Invoice Number"
          helperText="Please enter your invoice number"
          type="number"
        />
        <DatePicker
          name="issueDate"
          label="Issue Date"
          helperText="Please enter your invoice issue date"
          required
        />
        <DatePicker
          name="dueDate"
          label="Due Date"
          helperText="Please enter your invoice due date"
          required
        />
      </div>
    </>
  );
};
