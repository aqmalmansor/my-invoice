import { DateValueType } from "react-tailwindcss-datepicker";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

import {
  ARRAY_CANNOT_BE_EMPTY_ERROR,
  DEFAULT_CURRENCY,
  DEFAULT_MYR_SST,
  EMAIL_FIELD_ERROR,
  MINIMUM_VALUE_ERROR,
  REQUIRED_FIELD_ERROR,
} from "@app/lib/constants";
import { InvoiceItem } from "@app/lib/entities";
import { nullableField } from "@app/lib/utils";

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
    }),
  );

export const validationSchema = toFormikValidationSchema(
  z.object({
    invoiceNumber: nullableField(
      z.number({ required_error: REQUIRED_FIELD_ERROR }),
    ),
    issueDate: singleDateSchema(),
    dueDate: singleDateSchema(),
    business: z.object({
      logo: z.string().nullable().optional(),
      name: nullableField(z.string({ required_error: REQUIRED_FIELD_ERROR })),
      address: nullableField(
        z.string({ required_error: REQUIRED_FIELD_ERROR }),
      ),
      email: z
        .string()
        .email({ message: EMAIL_FIELD_ERROR })
        .optional()
        .or(z.literal(null)),
      phone: nullableField(z.string({ required_error: REQUIRED_FIELD_ERROR })),
    }),
    client: z.object({
      name: nullableField(z.string({ required_error: REQUIRED_FIELD_ERROR })),
      address: nullableField(
        z.string({ required_error: REQUIRED_FIELD_ERROR }),
      ),
      email: z
        .string()
        .email({ message: EMAIL_FIELD_ERROR })
        .optional()
        .or(z.literal(null)),
    }),
    invoiceItems: z
      .array(
        z.object({
          name: z.string({ required_error: REQUIRED_FIELD_ERROR }),
          price: z
            .number({ required_error: REQUIRED_FIELD_ERROR })
            .positive({ message: MINIMUM_VALUE_ERROR(0) }),
          quantity: z
            .number({ required_error: REQUIRED_FIELD_ERROR })
            .min(1, { message: MINIMUM_VALUE_ERROR(1) }),
        }),
      )
      .nonempty({ message: ARRAY_CANNOT_BE_EMPTY_ERROR }),
    currency: nullableField(z.string({ required_error: REQUIRED_FIELD_ERROR })),
    notes: z
      .array(z.string({ required_error: REQUIRED_FIELD_ERROR }))
      .optional(),
    tax: z
      .number()
      .positive({ message: MINIMUM_VALUE_ERROR(0) })
      .nullable()
      .optional(),
  }),
);

export const defaultInvoiceItem: InvoiceItem = {
  id: uuidv4(),
  name: "",
  quantity: 1,
  price: 1,
};

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
  invoiceItems: [defaultInvoiceItem],
  currency: DEFAULT_CURRENCY,
  notes: [],
  tax: DEFAULT_MYR_SST,
};

export const debugFormValues: FormValuesType = Object.assign(
  {},
  initialFormValues,
  {
    invoiceNumber: 260995,
    issueDate: {
      startDate: new Date(),
      endDate: new Date(),
    },
    dueDate: {
      startDate: new Date(),
      endDate: new Date(),
    },
    business: {
      logo: null,
      name: "My company",
      address: "My address, \nMy city, \nMy country",
      email: "my@email.com",
      phone: "0123456789",
    },
    client: {
      name: "My client",
      address: "Client address, \nClient city, \nClient country",
      email: "client@email.com",
    },
  },
);
