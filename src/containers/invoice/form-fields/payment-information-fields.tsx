import { FC } from "react";
import { Text } from "@radix-ui/themes";

import { TextInput } from "@app/components";

export const PaymentInformationFields: FC = () => {
  return (
    <>
      <Text
        weight="bold"
        size="6"
        className="pb-2 mb-3 border-b-2 grid col-span-2"
      >
        Payment Information (Bank Transfer)
      </Text>
      <div className="flex flex-wrap gap-x-8">
        <div className="w-[calc(50%-1rem)]">
          <TextInput
            name="paymentInformation.bankName"
            label="Bank Name"
            helperText="Please enter your bank name"
          />
        </div>
        <div className="w-[calc(50%-1rem)]">
          <TextInput
            name="paymentInformation.swiftCode"
            label="Swift Code"
            helperText="Please enter your bank swift code"
          />
        </div>
        <div className="w-[calc(50%-1rem)]">
          <TextInput
            name="paymentInformation.bankAccHolderName"
            label="Bank Account Holder Name"
            helperText="Please enter your bank account holder name"
          />
        </div>
        <div className="w-[calc(50%-1rem)]">
          <TextInput
            type="number"
            name="paymentInformation.bankAccHolderNumber"
            label="Bank Account Holder Number"
            helperText="Please enter your bank account holder number"
          />
        </div>
      </div>
    </>
  );
};
