import { FC } from "react";
import { Text, View } from "@react-pdf/renderer";

import { FormValuesType } from "../../../../config";
import { notesStyles as styles } from "./config";

export const Notes: FC<Pick<FormValuesType, "notes">> = ({ notes }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Terms and conditions</Text>
    {notes.map((note, index) => (
      <Text key={index} style={styles.note}>
        {index + 1}. {note}
      </Text>
    ))}
  </View>
);
