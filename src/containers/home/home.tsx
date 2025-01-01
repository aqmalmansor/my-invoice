import { Text } from "@radix-ui/themes";
import { FC } from "react";

import { FormFields } from "./form-fields";

export const Home: FC = () => {
  return (
    <div>
      <Text>My Invoice Generator</Text>
      <FormFields />
    </div>
  );
};
