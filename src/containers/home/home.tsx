import { Text } from "@radix-ui/themes";
import { FC } from "react";

import { Form } from "./form";

export const Home: FC = () => {
  return (
    <div>
      <Text>My Invoice Generator</Text>
      <Form />
    </div>
  );
};
