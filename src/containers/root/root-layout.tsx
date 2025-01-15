import { Theme } from "@radix-ui/themes";
import { Helmet } from "react-helmet";
import { Outlet } from "react-router";

import { Footer, Header } from "@app/components/globals";
import { cn } from "@app/lib/utils";

import { rootBackground } from "./config";

const meta = {
  title: "My Invoice Generator",
  description: "Place to generate your invoice",
  github: "https://github.com/aqmalmansor",
  author: "Aqmal Mansor",
};

export const RootLayout = () => (
  <Theme>
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={meta.github} />
      <meta name="author" content={meta.author} />
    </Helmet>
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
