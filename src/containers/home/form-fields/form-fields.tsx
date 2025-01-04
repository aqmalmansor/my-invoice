import { Formik, Form } from "formik";
import { FC, useState } from "react";
import { Button, Flex } from "@radix-ui/themes";

import { Debug } from "./debug";
import { BusinessFields } from "./business-fields";
import { CustomerFields } from "./customer-fields";
import { InvoiceFields } from "./invoice-fields";
import { InvoiceItemsFields } from "./invoice-items-fields";
import { PreviewPdfModal } from "./preview-pdf-modal";
import {
  debugFormValues,
  FormValuesType,
  initialFormValues,
  validationSchema,
} from "../config";

export const FormFields: FC = () => {
  const debugMode = true;
  const initialValues = debugMode ? debugFormValues : initialFormValues;

  const [isOpen, setIsOpen] = useState(true);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Formik<FormValuesType>
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => console.log(values)}
      >
        {({ submitForm, isValid, dirty, resetForm, errors }) => (
          <Form noValidate>
            {isOpen && (
              <PreviewPdfModal toggle={toggle} onSubmit={submitForm} />
            )}
            <InvoiceFields />
            <div className="grid grid-cols-2 gap-8">
              <div className="grid col-span-1">
                <BusinessFields />
              </div>
              <div className="grid col-span-1">
                <CustomerFields />
              </div>
            </div>
            <InvoiceItemsFields />
            <Debug
              display={debugMode}
              errors={errors}
              isValid={isValid}
              dirty={dirty}
            />
            <Flex justify="between" wrap="wrap" mt="5" className="gap-5">
              <Button
                type="reset"
                variant="outline"
                onClick={() => resetForm()}
                className="flex-grow min-w-[200px]"
              >
                Reset
              </Button>
              <Button
                type="button"
                onClick={() => setIsOpen(true)}
                className="flex-grow min-w-[200px]"
              >
                Preview PDF
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </div>
  );
};
