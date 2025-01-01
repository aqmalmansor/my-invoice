import { FieldArray, useFormikContext } from "formik";
import { FC, Fragment, useCallback, useMemo } from "react";
import { Button, Flex, Separator, Text } from "@radix-ui/themes";
import { v4 as uuidv4 } from "uuid";

import { TextInput } from "../../../../components";
import { defaultInvoiceItem, FormValuesType } from "../../config";
import { DEFAULT_CURRENCY } from "../../../../lib/constants";
import { formatCurrency } from "../../../../lib/utils";

import { InvoiceItemsFooter } from "./invoice-items-footer";
import { InvoiceConfig } from "./invoice-config";

export const InvoiceItemsFields: FC = () => {
  const {
    values: { invoiceItems, currency, tax },
  } = useFormikContext<FormValuesType>();

  const currencyLabel = currency ?? DEFAULT_CURRENCY;

  const invoiceItemsBody = useMemo(
    () => (
      <FieldArray
        name="invoiceItems"
        render={({ remove, insert }) => {
          const renderItems = () =>
            invoiceItems.map((invoice, index) => {
              return (
                <Fragment key={`invoice-item-${invoice.id}`}>
                  <div className="grid col-span-3">
                    <TextInput
                      name={`invoiceItems[${index}].name`}
                      helperText="Item description"
                      placeholder="Invoice Name"
                    />
                  </div>
                  <div className="grid col-span-2">
                    <TextInput
                      name={`invoiceItems[${index}].quantity`}
                      placeholder="Quantity"
                      helperText="Min amount is 1"
                      type="number"
                    />
                  </div>
                  <div className="grid col-span-2">
                    <TextInput
                      name={`invoiceItems[${index}].price`}
                      placeholder="Price"
                      helperText="Price must be greater than 0"
                      type="number"
                      startAdornment={currencyLabel}
                    />
                  </div>
                  <Text align="center" className="pt-2">
                    {formatCurrency(
                      invoice.price * invoice.quantity,
                      currencyLabel
                    )}
                  </Text>
                  <Flex justify="center" className="pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      color="red"
                      onClick={() => remove(index)}
                      disabled={invoiceItems.length <= 1}
                    >
                      Remove
                    </Button>
                  </Flex>
                </Fragment>
              );
            });

          const renderAddItem = () => (
            <div className="grid col-span-9 justify-end" key={uuidv4()}>
              <Button
                type="button"
                onClick={() =>
                  insert(
                    invoiceItems.length,
                    Object.assign({}, defaultInvoiceItem, { id: uuidv4() })
                  )
                }
              >
                Add Item
              </Button>
            </div>
          );

          return <>{[renderItems(), renderAddItem()]}</>;
        }}
      />
    ),
    [currencyLabel, invoiceItems]
  );

  const invoiceItemsHeaders = useMemo(
    () => (
      <>
        <Text weight="bold" size="4" className="grid col-span-3">
          Invoice Item
        </Text>
        <Text weight="bold" size="4" className="grid col-span-2">
          Quantity
        </Text>
        <Text weight="bold" size="4" className="grid col-span-2">
          Price ({currencyLabel})
        </Text>
        <Text weight="bold" size="4" align="center">
          Item Price
        </Text>
        <Text weight="bold" size="4" align="center">
          Actions
        </Text>
      </>
    ),
    [currencyLabel]
  );

  const subTotalPrice = useCallback(() => {
    return invoiceItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  }, [invoiceItems]);

  const totalTaxPrice = useCallback(
    () => (tax ? (subTotalPrice() * (tax ?? 0)) / 100 : 0),
    [tax, subTotalPrice]
  );

  const totalPriceWithTax = useCallback(
    () => subTotalPrice() + totalTaxPrice(),
    [subTotalPrice, totalTaxPrice]
  );

  return (
    <div className="my-3 w-full">
      <div className="pt-3 pb-2">
        <Text weight="bold" size="6">
          Manage your invoice items here
        </Text>
      </div>
      <Separator size="4" mb="5" />
      <InvoiceConfig />
      <div className="grid grid-cols-8 gap-4">
        {invoiceItemsHeaders}
        {invoiceItemsBody}
      </div>
      <Separator size="4" my="5" />
      <div className="grid grid-cols-10 gap-4">
        <InvoiceItemsFooter
          label="Subtotal Amount"
          value={formatCurrency(subTotalPrice(), currencyLabel)}
        />
        {tax && (
          <InvoiceItemsFooter
            label={`Tax (${tax ?? 1}%)`}
            value={formatCurrency(totalTaxPrice(), currencyLabel)}
          />
        )}
        <InvoiceItemsFooter
          label="Total Amount"
          value={formatCurrency(totalPriceWithTax(), currencyLabel)}
        />
      </div>
    </div>
  );
};
