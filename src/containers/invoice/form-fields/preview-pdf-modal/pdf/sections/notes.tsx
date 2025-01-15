import { FC } from "react";
import { Text, View } from "@react-pdf/renderer";

import { FormValuesType } from "../../../../config";
import { notesStyles as styles } from "./config";

export const Notes: FC<Pick<FormValuesType, "notes">> = ({ notes }) => (
  <View style={styles.container}>
    <Text>TODO: Add Notes Input {notes.length}</Text>
  </View>
);
