import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

import { DEFAULT_CURRENCY, DEFAULT_MYR_SST } from "../../lib/constants";
import { InvoiceItem } from "../../lib/entities";

export interface FormValuesType {
  invoiceNumber: Nullable<number>;
  issueDate: Nullable<Date>;
  dueDate: Nullable<Date>;
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

export const validationSchema = toFormikValidationSchema(
  z.object({
    invoiceNumber: z.number().nullable(),
    issueDate: z.date().nullable(),
    dueDate: z.date().nullable(),
    business: z.object({
      logo: z.string().nullable().optional(),
      name: z.string().nullable(),
      address: z.string().nullable(),
      email: z.string().nullable(),
      phone: z.string().nullable(),
    }),
    client: z.object({
      name: z.string().nullable(),
      address: z.string().nullable(),
      email: z.string().nullable(),
    }),
    invoiceItems: z
      .array(
        z.object({
          name: z.string(),
          price: z.number(),
          quantity: z.number(),
        })
      )
      .min(1),
    currency: z.string().nullable(),
    notes: z.array(z.string()),
    tax: z.number().nullable(),
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
