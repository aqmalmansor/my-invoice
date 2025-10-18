import { FC } from "react";
import { Button, Text } from "@radix-ui/themes";
import { useFormikContext } from "formik";

import { Select, TextInput } from "../../../../components";
import { currencies } from "../../../../lib/constants";
import { FormValuesType } from "../../config";

export const InvoiceConfig: FC = () => {
  const { setFieldValue } = useFormikContext<FormValuesType>();

  const clearTax = () => setFieldValue("tax", null);

  const renderTaxField = () => (
    <>
      <div className="col-span-12 md:col-span-1 pt-2">
        <Text>Tax:</Text>
      </div>
      <div className="col-span-6 md:col-span-3">
        <TextInput
          placeholder="Tax"
          type="number"
          name="tax"
          helperText="Please enter tax percentage (%)"
        />
      </div>
      <div className="col-span-6 items-center pt-1">
        <Button type="button" onClick={clearTax}>
          Clear Tax
        </Button>
      </div>
    </>
  );

  const renderCurrencyOptions = () => (
    <>
      <div className="col-span-12 md:col-span-1">
        <Text>Currency:</Text>
      </div>
      <div className="col-span-6 md:col-span-3">
        <Select
          options={currencies}
          name="currency"
          helperText="Please select currency"
        />
      </div>
    </>
  );

  return (
    <div className="block">
      <Text weight="bold" size="4" className="grid col-span-3">
        Invoice configuration
      </Text>
      <div className="grid grid-cols-10 gap-2 mt-3 mb-5">
        {renderTaxField()}
        {renderCurrencyOptions()}
      </div>
    </div>
  );
};
