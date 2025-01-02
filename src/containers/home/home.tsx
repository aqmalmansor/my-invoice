import { Flex, Text } from "@radix-ui/themes";
import { FC } from "react";

import { FormFields } from "./form-fields";

export const Home: FC = () => {
  return (
    <div className="py-5 md-px-5 px-3">
      <Flex align="center" justify="center">
        <Text weight="bold" size="6" className="pt-3 pb-2 mb-3 text-center">
          My Invoice Generator
        </Text>
      </Flex>
      <FormFields />
    </div>
  );
};
