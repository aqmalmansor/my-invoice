import { Flex } from "@radix-ui/themes";
import { FormikErrors } from "formik";
import { FC } from "react";

import { FormValuesType } from "../config";

interface DebugProps {
  errors: FormikErrors<FormValuesType>;
  isValid: boolean;
  dirty: boolean;
  display: boolean;
}

export const Debug: FC<DebugProps> = ({ errors, isValid, dirty, display }) => {
  return display ? (
    <div>
      <Flex direction="column">
        <pre>{JSON.stringify(errors, null, 2)}</pre>
        <div>{!isValid ? "Invalid cant submit form" : "Safe to submit"}</div>
        <div>{!dirty ? "not dirty cant submit" : "dirty can submit"}</div>
      </Flex>
    </div>
  ) : null;
};
