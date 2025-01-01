import { Formik, Form } from "formik";
import { FC } from "react";
import { Button, Flex } from "@radix-ui/themes";

import { FormValuesType, initialFormValues, validationSchema } from "../config";

import { DatePicker, TextArea, TextInput } from "../../../components";

export const FormFields: FC = () => {
  return (
    <div>
      <Formik<FormValuesType>
        initialValues={initialFormValues}
        validationSchema={validationSchema}
        onSubmit={(values) => console.log(values)}
      >
        {({ submitForm, isValid, dirty, resetForm, errors }) => (
          <Form noValidate>
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
            <TextInput
              required
              name="business.name"
              label="Business Name"
              helperText="Please enter your company name"
            />
            <TextInput
              type="email"
              name="business.email"
              label="Business Email"
              helperText="Please enter your company email"
            />
            <TextArea
              required
              name="business.address"
              label="Business Address"
              helperText="Please enter your company address"
            />

            {/* To be removed - start */}
            <Flex direction="column">
              <pre>{JSON.stringify(errors, null, 2)}</pre>
              <div>
                {!isValid ? "Invalid cant submit form" : "Safe to submit"}
              </div>
              <div>{!dirty ? "not dirty cant submit" : "dirty can submit"}</div>
            </Flex>
            {/* To be removed - end */}
            <Flex justify="between" wrap="wrap" mt="5" className="gap-5">
              <Button
                variant="outline"
                type="submit"
                disabled={!isValid || !dirty}
                onClick={() => submitForm()}
                className="flex-grow min-w-[200px]"
              >
                Generate PDF
              </Button>
              <Button
                type="reset"
                onClick={() => resetForm()}
                className="flex-grow min-w-[200px]"
              >
                Reset
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </div>
  );
};
