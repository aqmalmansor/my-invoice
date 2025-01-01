import { Formik, Form } from "formik";
import { FC } from "react";
import { Button, Flex } from "@radix-ui/themes";

import { Debug } from "./debug";
import { BusinessFields } from "./business-fields";
import { CustomerFields } from "./customer-fields";
import { InvoiceFields } from "./invoice-fields";
import { InvoiceItemsFields } from "./invoice-items-fields";
import {
  debugFormValues,
  FormValuesType,
  initialFormValues,
  validationSchema,
} from "../config";

export const FormFields: FC = () => {
  const debugMode = false;

  const initialValues = debugMode ? debugFormValues : initialFormValues;

  return (
    <div>
      <Formik<FormValuesType>
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => console.log(values)}
      >
        {({ submitForm, isValid, dirty, resetForm, errors }) => (
          <Form noValidate>
            <InvoiceFields />
            <BusinessFields />
            <CustomerFields />
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
                type="submit"
                onClick={() => submitForm()}
                className="flex-grow min-w-[200px]"
              >
                Generate PDF
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </div>
  );
};
