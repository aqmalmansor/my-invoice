import { Styles, StyleSheet } from "@react-pdf/renderer";

const fixedColumnStyle = {
  display: "flex",
  justifyContent: "center",
};

const setFlexBasis = (basis: string) =>
  Object.assign({}, fixedColumnStyle, {
    flexBasis: basis,
  }) as Styles;

export const notesStyles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    paddingHorizontal: "10px",
  },
});

export const footerStyles = StyleSheet.create({
  title: {
    fontSize: 12,
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: "10px",
    paddingHorizontal: "10px",
  },
  signatureCol: {
    paddingTop: "4px",
    borderTop: "1px dotted #000",
    minWidth: "120px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  signatureText: {
    textAlign: "center",
    fontSize: "10px",
  },
  paymentCol: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  paymentColTitle: {
    backgroundColor: "#FFD700",
  },
});

export const invoiceHeaderStyles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: "16px",
  },
  column: {
    display: "flex",
    flexDirection: "column",
  },
  h5: {
    fontSize: "12px",
    fontWeight: "bold",
  },
  rightColBasis: {
    flexBasis: "200px",
  },
  baseInvoiceContainer: {
    paddingRight: "10px",
    display: "flex",
    width: "100%",
    flexDirection: "column",
    gap: "4px",
  },
  baseInvoiceTextContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  baseInvoiceTextLeftCol: {
    display: "flex",
    flexBasis: "120px",
  },
  baseInvoiceTextLeftColText: {
    fontSize: "12px",
  },
  labelOpa60: {
    opacity: 0.65,
  },
  baseInvoiceTextRightColText: {
    opacity: 1,
    fontSize: "12px",
  },
  personalInfoCol: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    width: "100%",
  },
  personalInfoChildCol: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    width: "100%",
  },
  companyName: {
    fontSize: "13px",
  },
  small: {
    fontSize: "10px",
  },
});

export const tableStyles = StyleSheet.create({
  container: {
    display: "flex",
  },
  tr: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
  },
  thead: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    borderBottom: "1px solid #000",
    paddingBottom: "5px",
  },
  th: {
    textAlign: "center",
    fontSize: "11px",
    paddingHorizontal: "5px",
    paddingVertical: "3px",
  },
  td: {
    textAlign: "center",
    fontSize: "10px",
    paddingHorizontal: "5px",
    marginBottom: "6px",
  },
  tbody: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    minHeight: "300px",
    paddingVertical: "6px",
    borderBottom: "1px solid #000",
    marginBottom: "6px",
  },
  idColumn: setFlexBasis("30px"),
  qtyColumn: setFlexBasis("90px"),
  priceColumn: setFlexBasis("100px"),
  priceTimesQtyColumn: setFlexBasis("100px"),
  descriptionColumn: { flex: 1, justifyContent: "flex-start" },
  label: {
    textAlign: "right",
    fontSize: "12px",
    paddingLeft: "5px",
    marginTop: "6px",
    paddingRight: "10px",
    opacity: 0.65,
  },
  viewPrice: setFlexBasis("150px"),
  summaryContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: "12px",
    width: "100%",
    alignItems: "center",
    paddingRight: "26px",
    paddingTop: "5px",
    paddingBottom: "10px",
  },
  summaryCol: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: "6px",
  },
  summaryValueText: {
    fontSize: "12px",
    textAlign: "right",
  },
  summaryLabelText: {
    fontSize: "12px",
    textAlign: "right",
    opacity: 0.65,
  },
});
