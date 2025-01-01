import { FC } from "react";
import { DatePicker, TextInput } from "../../../components";

export const InvoiceFields: FC = () => {
  return (
    <>
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
    </>
  );
};
