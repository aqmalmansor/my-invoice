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
    <>
      <div className="col-span-8">
        <Flex justify="end">
          <Text weight="bold" size="6">
            {label}:
          </Text>
        </Flex>
      </div>
      <div className="col-span-2">
        <Text weight="bold" size="6">
          {value}
        </Text>
      </div>
    </>
  );
};
