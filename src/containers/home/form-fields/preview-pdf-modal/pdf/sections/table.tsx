import { Text, View } from "@react-pdf/renderer";
import { FC } from "react";

import { tableStyles as styles } from "./config";
import type { useCalculateInvoice } from "../../../hook";
import { FormValuesType } from "../../../../config";

type TableProps = Pick<FormValuesType, "invoiceItems" | "tax"> &
  ReturnType<typeof useCalculateInvoice>;

export const Table: FC<TableProps> = ({
  invoiceItems,
  tax,
  formatPrice,
  totalTaxPrice,
  totalPriceWithTax,
  subTotalPrice,
  currencyAffix,
}) => (
  <View style={styles.container}>
    <View style={styles.thead}>
      <View style={styles.tr}>
        <View style={styles.idColumn}>
          <Text style={styles.th}>No.</Text>
        </View>
        <View style={styles.descriptionColumn}>
          <Text style={[styles.th, { textAlign: "left" }]}>Description</Text>
        </View>
        <View style={styles.qtyColumn}>
          <Text style={styles.th}>Quantity</Text>
        </View>
        <View style={styles.priceColumn}>
          <Text style={styles.th}>Price ({currencyAffix})</Text>
        </View>
        <View style={styles.priceTimesQtyColumn}>
          <Text style={styles.th}>Amount ({currencyAffix})</Text>
        </View>
      </View>
    </View>
    <View style={styles.tbody}>
      {invoiceItems.map((item, index) => (
        <View key={item.id} style={styles.tr}>
          <View style={styles.idColumn}>
            <Text style={styles.td}>{index + 1}</Text>
          </View>
          <View style={styles.descriptionColumn}>
            <Text style={[styles.td, { textAlign: "left" }]}>{item.name}</Text>
          </View>
          <View style={styles.qtyColumn}>
            <Text style={styles.td}>{item.quantity}</Text>
          </View>
          <View style={styles.priceColumn}>
            <Text style={styles.td}>{formatPrice(item.price, true)}</Text>
          </View>
          <View style={styles.priceTimesQtyColumn}>
            <Text style={styles.td}>
              {formatPrice(item.price * item.quantity, true)}
            </Text>
          </View>
        </View>
      ))}
    </View>
    <TableSummary
      subTotalPrice={subTotalPrice}
      totalPriceWithTax={totalPriceWithTax}
      totalTaxPrice={totalTaxPrice}
      tax={tax}
    />
  </View>
);

const TableSummary = ({
  subTotalPrice,
  totalPriceWithTax,
  totalTaxPrice,
  tax,
}: Pick<
  TableProps,
  "totalTaxPrice" | "totalPriceWithTax" | "subTotalPrice" | "tax"
>) => (
  <View style={styles.summaryContainer}>
    <View style={styles.summaryCol}>
      <Text style={styles.summaryLabelText}>Subtotal:</Text>
      <Text style={styles.summaryLabelText}>Tax ({tax}%):</Text>
      <Text style={styles.summaryLabelText}>Due Amount:</Text>
    </View>
    <View style={[styles.summaryCol, { minWidth: "80px" }]}>
      <Text style={styles.summaryValueText}>{subTotalPrice}</Text>
      <Text style={styles.summaryValueText}>{totalTaxPrice}</Text>
      <Text style={styles.summaryValueText}>{totalPriceWithTax}</Text>
    </View>
  </View>
);
