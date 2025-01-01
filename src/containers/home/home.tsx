import { Text } from "@radix-ui/themes";
import { FC } from "react";

import { FormFields } from "./form-fields";

export const Home: FC = () => {
  return (
    <div className="py-5 md-px-5 px-3">
      <Text>My Invoice Generator</Text>
      <FormFields />
    </div>
  );
};
