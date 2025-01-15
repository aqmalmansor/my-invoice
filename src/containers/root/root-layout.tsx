import { Theme } from "@radix-ui/themes";
import { Outlet } from "react-router";

import { Footer, Header } from "@app/components/globals";
import { cn } from "@app/lib/utils";

import { rootBackground } from "./config";

export const RootLayout = () => (
  <Theme>
    <div className={cn([rootBackground])}>
      <div className={cn(["container max-w-[1280px] mx-auto"])}>
        <div className="md-px-5 px-7 shadow-md pt-5 min-h-screen pb-24 relative bg-white">
          <Header />
          <Outlet />
        </div>
      </div>
    </div>
    <Footer />
  </Theme>
);
