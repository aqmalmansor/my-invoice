import { type FieldMetaProps } from "formik";
import { z, ZodTypeAny } from "zod";

import { REQUIRED_FIELD_ERROR } from "../constants";

interface ErrorFieldProps {
  error?: boolean;
  helperText?: string;
  helperTextVariables?: Record<string, string>;
}

export const nullableField = <T extends ZodTypeAny>(
  schema: T,
  message = REQUIRED_FIELD_ERROR,
) => {
  return schema.nullable().transform((val, ctx) => {
    if (val === null) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        fatal: true,
        message,
      });

      return z.NEVER;
    }

    return val;
  });
};

export const getErrorFieldProps = (
  meta?: FieldMetaProps<unknown>,
  submitCount?: number,
): ErrorFieldProps =>
  meta && (meta.touched || submitCount) && meta.error !== undefined
    ? {
        error: true,
        helperText: meta.error,
      }
    : {};
