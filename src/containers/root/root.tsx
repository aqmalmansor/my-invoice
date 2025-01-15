import { FC } from "react";
import { Theme } from "@radix-ui/themes";

import { Invoice } from "@app/containers/invoice";

export const Root: FC = () => {
  return (
    <Theme>
      <div className="container max-w-[1280px] min-h-screen mx-auto">
        <Invoice />
      </div>
    </Theme>
  );
};
