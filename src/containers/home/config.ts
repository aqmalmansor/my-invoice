import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { DateValueType } from "react-tailwindcss-datepicker";

import {
  ARRAY_CANNOT_BE_EMPTY_ERROR,
  DEFAULT_CURRENCY,
  DEFAULT_MYR_SST,
  EMAIL_FIELD_ERROR,
  REQUIRED_FIELD_ERROR,
} from "../../lib/constants";
import { InvoiceItem } from "../../lib/entities";
import { nullableField } from "../../lib/utils";

export interface FormValuesType {
  invoiceNumber: Nullable<number>;
  issueDate: DateValueType;
  dueDate: DateValueType;
  business: {
    logo: Nullable<string>;
    name: Nullable<string>;
    address: Nullable<string>;
    email: Nullable<string>;
    phone: Nullable<string>;
  };
  client: {
    name: Nullable<string>;
    address: Nullable<string>;
    email: Nullable<string>;
  };
  invoiceItems: InvoiceItem[];
  currency: Nullable<string>;
  tax: Nullable<number>;
  notes: string[];
}

const singleDateSchema = () =>
  nullableField(
    z.object({
      startDate: z.date({ required_error: REQUIRED_FIELD_ERROR }),
      endDate: z.date({ required_error: REQUIRED_FIELD_ERROR }),
    })
  );

export const validationSchema = toFormikValidationSchema(
  z.object({
    invoiceNumber: nullableField(
      z.number({ required_error: REQUIRED_FIELD_ERROR })
    ),
    issueDate: singleDateSchema(),
    dueDate: singleDateSchema(),
    business: z.object({
      logo: nullableField(z.string().optional()),
      name: nullableField(z.string({ required_error: REQUIRED_FIELD_ERROR })),
      address: nullableField(
        z.string({ required_error: REQUIRED_FIELD_ERROR })
      ),
      email: nullableField(
        z
          .string({ required_error: REQUIRED_FIELD_ERROR })
          .email({ message: EMAIL_FIELD_ERROR })
      ),
      phone: nullableField(z.string({ required_error: REQUIRED_FIELD_ERROR })),
    }),
    client: z.object({
      name: nullableField(z.string({ required_error: REQUIRED_FIELD_ERROR })),
      address: nullableField(
        z.string({ required_error: REQUIRED_FIELD_ERROR })
      ),
      email: nullableField(
        z.string().email({ message: EMAIL_FIELD_ERROR }).optional()
      ),
    }),
    invoiceItems: z
      .array(
        z.object({
          name: z.string(),
          price: z.number(),
          quantity: z.number(),
        })
      )
      .nonempty({ message: ARRAY_CANNOT_BE_EMPTY_ERROR }),
    currency: nullableField(z.string({ required_error: REQUIRED_FIELD_ERROR })),
    notes: z.array(z.string()),
    tax: z.number().optional(),
  })
);

export const initialFormValues: FormValuesType = {
  invoiceNumber: null,
  issueDate: null,
  dueDate: null,
  business: {
    logo: null,
    name: null,
    address: null,
    email: null,
    phone: null,
  },
  client: {
    name: null,
    address: null,
    email: null,
  },
  invoiceItems: [],
  currency: DEFAULT_CURRENCY,
  notes: [],
  tax: DEFAULT_MYR_SST,
};
