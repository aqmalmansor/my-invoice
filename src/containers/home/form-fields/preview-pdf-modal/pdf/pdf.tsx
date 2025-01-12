import { Page, View, Document, PDFViewer } from "@react-pdf/renderer";
import { FC } from "react";
import { useFormikContext } from "formik";

import { styles } from "./config";
import { Footer, InvoiceHeader, Table } from "./sections";
import { FormValuesType } from "../../../config";
import { useCalculateInvoice } from "../../hook";
import { Notes } from "./sections/notes";

export const Pdf: FC = () => {
  const {
    values: { invoiceItems, currency, tax, ...value },
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
            {value.notes?.length > 0 && <Notes notes={value.notes} />}
            <Footer />
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};
