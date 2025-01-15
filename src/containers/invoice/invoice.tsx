import { FC } from "react";
import { Flex, Text } from "@radix-ui/themes";

import { FormFields } from "./form-fields";

export const Invoice: FC = () => {
  return (
    <>
      <Flex align="center" justify="center">
        <Text weight="bold" size="6" className="pt-3 pb-2 mb-3 text-center">
          My Invoice Generator
        </Text>
      </Flex>
      <FormFields />
    </>
  );
};
