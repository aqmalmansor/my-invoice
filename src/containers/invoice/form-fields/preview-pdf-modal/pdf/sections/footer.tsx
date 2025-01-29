import { FC } from "react";
import { Text, View } from "@react-pdf/renderer";

import { FormValuesType } from "@app/containers/invoice";

import { footerStyles as styles } from "./config";

interface FooterProps {
  paymentInformation: FormValuesType["paymentInformation"];
}

export const Footer: FC<FooterProps> = ({ paymentInformation }) => (
  <View
    style={[
      styles.footer,
      { justifyContent: paymentInformation ? "space-between" : "flex-end" },
    ]}
  >
    {!!paymentInformation && (
      <View style={styles.paymentCol}>
        <>
          <Text style={[styles.title]}>Payment Method (Bank Transfer)</Text>
          <View style={styles.paymentCol}>
            <Text style={[styles.paymentText]}>
              Bank: {paymentInformation?.bankName || "-"}
            </Text>
            {paymentInformation?.swiftCode && (
              <Text style={[styles.paymentText]}>
                Swift Code: {paymentInformation?.swiftCode || "-"}
              </Text>
            )}
            <Text style={[styles.paymentText]}>
              Account Name: {paymentInformation?.bankAccHolderName || "-"}
            </Text>
            <Text style={[styles.paymentText]}>
              Account Number: {paymentInformation?.bankAccHolderNumber || "-"}
            </Text>
          </View>
        </>
      </View>
    )}
    <View style={styles.signatureCol}>
      <Text style={styles.signatureText}>Signature</Text>
    </View>
  </View>
);
