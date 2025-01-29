import { FC } from "react";
import { Flex, Text } from "@radix-ui/themes";

interface InvoiceItemsFooterProps {
  label: string;
  value: string;
}

export const InvoiceItemsFooter: FC<InvoiceItemsFooterProps> = ({
  label,
  value,
}) => {
  return (
    <Flex justify="between" gapX="4">
      <Text weight="medium" size="6">
        {label}:
      </Text>
      <Text weight="bold" size="6">
        {value}
      </Text>
    </Flex>
  );
};
