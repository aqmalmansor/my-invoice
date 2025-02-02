import { FC } from "react";
import { Text } from "@radix-ui/themes";

export const ComingSoon: FC = () => (
  <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
    <div className="w-full bg-red flex flex-col items-center justify-center h-full gap-2">
      <Text size="8">Coming soon</Text>
    </div>
  </div>
);
