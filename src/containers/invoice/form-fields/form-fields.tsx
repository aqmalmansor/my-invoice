import { FC, useState } from "react";
import { Button, Flex } from "@radix-ui/themes";
import { Form, Formik } from "formik";

import { useLocalStorage } from "@app/hooks";
import { DEBUG, INVOICE_FORM_VALUES_KEY } from "@app/lib/constants";

import {
  debugFormValues,
  FormValuesType,
  initialFormValues,
  validationSchema,
} from "../config";
import { BusinessFields } from "./business-fields";
import { CustomerFields } from "./customer-fields";
import { Debug } from "./debug";
import { InvoiceFields } from "./invoice-fields";
import { InvoiceItemsFields } from "./invoice-items-fields";
import { PaymentInformationFields } from "./payment-information-fields";
import { PreviewPdfModal } from "./preview-pdf-modal";
import { ScrollToError } from "./scroll-to-error";

export const FormFields: FC = () => {
  const { localStorageState, handleUpdateLocalStorageState } =
    useLocalStorage<FormValuesType>({
      key: INVOICE_FORM_VALUES_KEY,
      initValue: DEBUG ? debugFormValues : initialFormValues,
    });

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const onSubmit = (values: FormValuesType) => {
    setIsOpen(true);
    handleUpdateLocalStorageState({
      ...initialFormValues,
      notes: values.notes || [],
      business: {
        ...values.business,
        logo: null,
      },
      invoiceNumber: values.invoiceNumber,
      paymentInformation: values.paymentInformation,
      tax: values.tax,
      currency: values.currency,
    });
  };

  return (
    <div>
      <Formik<FormValuesType>
        initialValues={localStorageState}
        validationSchema={validationSchema}
        onSubmit={(val) => onSubmit(val)}
      >
        {({ isValid, dirty, resetForm, errors }) => (
          <Form noValidate>
            <ScrollToError />
            {isOpen && <PreviewPdfModal toggle={toggle} />}
            <InvoiceFields />
            <div className="grid md:grid-cols-2 gap-8">
              <div id="business" className="grid md:col-span-1">
                <BusinessFields />
              </div>
              <div id="client" className="grid col-span-1 self-start">
                <CustomerFields />
              </div>
            </div>
            <PaymentInformationFields />
            <InvoiceItemsFields />
            <Debug
              display={DEBUG}
              errors={errors}
              isValid={isValid}
              dirty={dirty}
            />
            <Flex justify="between" wrap="wrap" mt="5" className="gap-5">
              <Button
                type="reset"
                variant="outline"
                onClick={() =>
                  resetForm({
                    values: initialFormValues,
                  })
                }
                className="flex-grow min-w-[200px]"
              >
                Reset
              </Button>
              <Button type="submit" className="flex-grow min-w-[200px]">
                Preview PDF
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </div>
  );
};
