import { FC } from "react";
import { Text, View } from "@react-pdf/renderer";

import { formatDate } from "../../../../../../lib/utils";
import { FormValuesType } from "../../../../config";
import { invoiceHeaderStyles as styles } from "./config";

type InvoiceHeaderProps = Omit<
  FormValuesType,
  "invoiceItems" | "currency" | "tax"
>;

export const InvoiceHeader: FC<InvoiceHeaderProps> = ({
  business,
  client,
  invoiceNumber,
  issueDate,
  dueDate,
}) => {
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.column}>
          {business.logo && <Text>{business.logo}</Text>}
        </View>
        <View style={[styles.column, styles.rightColBasis, { gap: "10px" }]}>
          <Text>INVOICE</Text>
          <View style={styles.baseInvoiceContainer}>
            <BaseInvoiceText label="ID:" value={`${invoiceNumber}`} />
            <BaseInvoiceText
              label="Issued Date:"
              value={`${formatDate(issueDate?.startDate)}`}
            />
            <BaseInvoiceText
              label="Due Date:"
              value={`${formatDate(dueDate?.startDate)}`}
            />
          </View>
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.column}>
          <View style={styles.personalInfoCol}>
            <Text style={[styles.h5, styles.labelOpa65]}>From</Text>
            <View style={styles.personalInfoChildCol}>
              <Text style={styles.companyName}>{business.name}</Text>
              <Text style={styles.small}>{business.email}</Text>
              <Text style={styles.small}>{business.phone}</Text>
              <Text style={styles.small}>{business.address}</Text>
            </View>
          </View>
        </View>
        <View style={[styles.column, styles.rightColBasis]}>
          <View style={styles.personalInfoCol}>
            <Text style={[styles.h5, styles.labelOpa65]}>Bill To</Text>
            <View style={styles.personalInfoChildCol}>
              <Text style={styles.companyName}>{client.name}</Text>
              <Text style={styles.small}>{client.email}</Text>
              <Text style={styles.small}>{client.address}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const BaseInvoiceText = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => (
  <View style={styles.baseInvoiceTextContainer}>
    <View style={styles.baseInvoiceTextLeftCol}>
      <Text style={[styles.baseInvoiceTextLeftColText, styles.labelOpa65]}>
        {label}
      </Text>
    </View>
    <Text style={styles.baseInvoiceTextRightColText}>{value}</Text>
  </View>
);
