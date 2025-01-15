import { FC } from "react";
import { Link, Theme } from "@radix-ui/themes";

import { Invoice } from "@app/containers/invoice";
import { cn } from "@app/lib/utils";

import { rootBackground } from "./config";

export const Root: FC = () => {
  return (
    <Theme>
      <div className={cn([rootBackground, "bg-[#FBFAF5]"])}>
        <div className={cn(["container max-w-[1280px] min-h-screen mx-auto"])}>
          <div className="md-px-5 px-7 shadow-md pt-5 pb-24 bg-white">
            <Invoice />
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-[50%] translate-x-[-50%] pt-3 pb-6 px-2">
        Made by <Link href="https://github.com/aqmalmansor">Aqmal Mansor</Link>
      </div>
    </Theme>
  );
};
