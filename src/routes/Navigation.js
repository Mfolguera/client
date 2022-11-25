import React from "react";
import { Routes, Route, Outlet, Link, BrowserRouter } from "react-router-dom";
import LayoutBasic from "../layout/LayoutBasic";
import Home from "../pages/Home";
import User from "../pages/User";
import Error404 from "../pages/Error404";

//const router = createBrowserRouter(routes);

export default function Navigation() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutBasic />}>
          <Route index element={<Home />} />
          <Route path="/:username" element={<User />} />
          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
