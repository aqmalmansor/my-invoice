import { FC } from "react";
import { Document, Page, PDFViewer, View } from "@react-pdf/renderer";
import { useFormikContext } from "formik";

import { FormValuesType } from "../../../config";
import { useCalculateInvoice } from "../../hook";
import { styles } from "./config";
import { Footer, InvoiceHeader, Table } from "./sections";
import { Notes } from "./sections/notes";

export const Pdf: FC = () => {
  const {
    values: { invoiceItems, currency, tax, paymentInformation, ...value },
  } = useFormikContext<FormValuesType>();

  const invoiceDetails = useCalculateInvoice(invoiceItems, tax, currency);

  const invoiceDocName = `${value.business?.name || ""} #${
    value.invoiceNumber || "Invoice number is missing"
  }`.trim();

  return (
    <PDFViewer className="max-h-[1080px] overflow-scroll rounded-md shadow-md w-full">
      <Document title={invoiceDocName}>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <InvoiceHeader {...value} />
            <Table invoiceItems={invoiceItems} tax={tax} {...invoiceDetails} />
          </View>
          <View style={styles.section}>
            <Footer paymentInformation={paymentInformation} />
            {value.notes?.length > 0 && <Notes notes={value.notes} />}
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};
