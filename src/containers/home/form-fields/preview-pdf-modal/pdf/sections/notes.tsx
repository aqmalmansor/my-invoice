import { View, Text } from "@react-pdf/renderer";
import { FC } from "react";

import { notesStyles as styles } from "./config";
import { FormValuesType } from "../../../../config";

export const Notes: FC<Pick<FormValuesType, "notes">> = ({ notes }) => (
  <View style={styles.container}>
    <Text>TODO: Add Notes Input {notes.length}</Text>
  </View>
);
