import { View, Text } from "@react-pdf/renderer";
import { FC } from "react";

import { footerStyles as styles } from "./config";
import { DEBUG } from "../../../../../../lib/constants";

// TODO: Add more sections
// Signature
// Bank information

export const Footer: FC = () => (
  <View
    style={[
      styles.footer,
      { justifyContent: DEBUG ? "space-between" : "flex-end" },
    ]}
  >
    {DEBUG && (
      <View style={styles.paymentCol}>
        <Text style={[styles.title]}>Payment Method</Text>
        <View style={styles.paymentCol}>
          <Text style={[styles.title]}>Bank Name</Text>
          <Text style={[styles.title]}>Account Name: Acc Name</Text>
          <Text style={[styles.title]}>Account Number: Acc number</Text>
        </View>
      </View>
    )}
    <View style={styles.signatureCol}>
      <Text style={styles.signatureText}>Signature</Text>
    </View>
  </View>
);
