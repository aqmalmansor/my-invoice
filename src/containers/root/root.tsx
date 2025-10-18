import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router";

import { Invoice } from "@app/containers/invoice";

import { RootLayout } from "./root-layout";

export const Root: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index path="*" element={<Invoice />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
