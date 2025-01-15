import { FC, Fragment, useMemo } from "react";
import { Button, Flex, Separator, Text } from "@radix-ui/themes";
import { FieldArray, useFormikContext } from "formik";
import { v4 as uuidv4 } from "uuid";

import { Select, TextInput } from "../../../../components";
import {
  DEBUG,
  DEFAULT_CURRENCY,
  QUANTITY_OPTIONS,
} from "../../../../lib/constants";
import { defaultInvoiceItem, FormValuesType } from "../../config";
import { useCalculateInvoice } from "../hook";
import { InvoiceConfig } from "./invoice-config";
import { InvoiceItemsFooter } from "./invoice-items-footer";

export const InvoiceItemsFields: FC = () => {
  const {
    values: { invoiceItems, currency, tax },
  } = useFormikContext<FormValuesType>();

  const currencyLabel = currency ?? DEFAULT_CURRENCY;

  const { subTotalPrice, totalTaxPrice, totalPriceWithTax, formatPrice } =
    useCalculateInvoice(invoiceItems, tax, currency);

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
                    {!DEBUG ? (
                      <TextInput
                        name={`invoiceItems[${index}].quantity`}
                        placeholder="Quantity"
                        helperText="Min amount is 1"
                        type="number"
                      />
                    ) : (
                      <div className="flex text-justify flex-row items-start gap-1">
                        <TextInput
                          name={`invoiceItems[${index}].quantity`}
                          placeholder="Quantity"
                          helperText="Min amount is 1"
                          type="number"
                        />
                        <Select
                          placeholder="Suffix"
                          helperText="Suffix"
                          options={QUANTITY_OPTIONS}
                          name={`invoiceItems[${index}].quantityUnit`}
                        />
                      </div>
                    )}
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
                    {formatPrice(invoice.price * invoice.quantity)}
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
                    Object.assign({}, defaultInvoiceItem, { id: uuidv4() }),
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
    [currencyLabel, formatPrice, invoiceItems],
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
    [currencyLabel],
  );

  return (
    <div className="my-3 w-full">
      <Text
        weight="bold"
        size="6"
        className="pb-2 mb-3 border-b-2 grid col-span-2"
      >
        Manage your invoice items here
      </Text>
      <InvoiceConfig />
      <div className="grid grid-cols-8 gap-4">
        {invoiceItemsHeaders}
        {invoiceItemsBody}
      </div>
      <Separator size="4" my="5" />
      <div className="grid grid-cols-10 gap-4">
        <InvoiceItemsFooter label="Subtotal Amount" value={subTotalPrice} />
        {tax && (
          <InvoiceItemsFooter
            label={`Tax (${tax ?? 1}%)`}
            value={totalTaxPrice}
          />
        )}
        <InvoiceItemsFooter label="Total Amount" value={totalPriceWithTax} />
      </div>
    </div>
  );
};
