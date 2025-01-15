import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router";

import { ComingSoon } from "@app/containers/coming-soon";
import { Invoice } from "@app/containers/invoice";

import { RootLayout } from "./root-layout";

export const Root: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index path="*" element={<Invoice />} />
          <Route index path="quotation" element={<ComingSoon />} />
          <Route index path="receipt" element={<ComingSoon />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
