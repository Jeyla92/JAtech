// ui/src/RootLayout.tsx
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./components/Footer";

export default function RootLayout() {
  return (
    <>
      <Header />
      <main style={{ padding: 16 }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
