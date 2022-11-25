import React from "react";
import { Container } from "semantic-ui-react";
import { Outlet, Link } from "react-router-dom";
import Header from "../components/Header";

export default function LayoutBasic(props) {
  return (
    <>
      <Header />
      <Container className="layout-basic">
        <Outlet />
      </Container>
    </>
  );
}
