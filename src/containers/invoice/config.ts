import { DateValueType } from "react-tailwindcss-datepicker";
import { v4 as uuidv4 } from "uuid";
import * as yup from "yup";

import {
  ARRAY_CANNOT_BE_EMPTY_ERROR,
  DEFAULT_CURRENCY,
  DEFAULT_MYR_SST,
  EMAIL_FIELD_ERROR,
  MINIMUM_VALUE_ERROR,
  REQUIRED_FIELD_ERROR,
} from "@app/lib/constants";
import { InvoiceItem, PaymentInformation } from "@app/lib/entities";

export interface FormValuesType {
  invoiceNumber: Nullable<string>;
  invoiceRef: Nullable<string>;
  invoiceDate: DateValueType;
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
  paymentInformation: Nullable<PaymentInformation>;
}

const singleDateSchema = () => yup.date().nullable();

export const validationSchema = yup.object({
  invoiceNumber: yup.string().nullable().required(REQUIRED_FIELD_ERROR),
  invoiceRef: yup.string().nullable().optional(),
  invoiceDate: yup
    .object({
      startDate: singleDateSchema(),
      endDate: singleDateSchema(),
    })
    .nullable(),
  business: yup.object({
    logo: yup.string().nullable().optional(),
    name: yup.string().nullable().required(REQUIRED_FIELD_ERROR),
    address: yup.string().nullable().required(REQUIRED_FIELD_ERROR),
    email: yup.string().email(EMAIL_FIELD_ERROR).nullable().optional(),
    phone: yup.string().nullable().required(REQUIRED_FIELD_ERROR),
  }),
  client: yup.object({
    name: yup.string().nullable().required(REQUIRED_FIELD_ERROR),
    address: yup.string().nullable().required(REQUIRED_FIELD_ERROR),
    email: yup.string().email(EMAIL_FIELD_ERROR).nullable().optional(),
  }),
  invoiceItems: yup
    .array(
      yup.object({
        name: yup.string().nullable().required(REQUIRED_FIELD_ERROR),
        price: yup
          .number()
          .nullable()
          .required(REQUIRED_FIELD_ERROR)
          .positive(MINIMUM_VALUE_ERROR(0)),
        quantity: yup
          .number()
          .nullable()
          .required(REQUIRED_FIELD_ERROR)
          .min(1, { message: MINIMUM_VALUE_ERROR(1) }),
      }),
    )
    .min(1, { message: ARRAY_CANNOT_BE_EMPTY_ERROR }),
  currency: yup.string().nullable().required(REQUIRED_FIELD_ERROR),
  notes: yup
    .array(yup.string().nullable().required(REQUIRED_FIELD_ERROR))
    .optional(),
  tax: yup.number().positive(MINIMUM_VALUE_ERROR(0)).nullable().optional(),
  paymentInformation: yup
    .object({
      bankName: yup.string().nullable(),
      bankAccHolderName: yup
        .string()
        .nullable()
        .when("bankName", (bankName, schema) =>
          bankName ? schema.required(REQUIRED_FIELD_ERROR) : schema,
        ),
      bankAccHolderNumber: yup
        .number()
        .nullable()
        .nullable()
        .when("bankName", (bankName, schema) =>
          bankName ? schema.required(REQUIRED_FIELD_ERROR) : schema,
        ),
      swiftCode: yup.string().nullable(),
    })
    .nullable()
    .optional(),
});

export const defaultInvoiceItem: InvoiceItem = {
  id: uuidv4(),
  name: "",
  quantity: 1,
  price: 1,
};

export const initialFormValues: FormValuesType = {
  invoiceNumber: null,
  invoiceRef: null,
  invoiceDate: {
    startDate: null,
    endDate: null,
  },
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
  paymentInformation: null,
};

export const debugFormValues: FormValuesType = Object.assign(
  {},
  initialFormValues,
  {
    invoiceNumber: "260995",
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
