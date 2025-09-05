// ui/src/RootLayout.tsx
import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function RootLayout() {
  return (
    <>
      <Header />
      <main style={{ padding: 16 }}>
        <Outlet />
      </main>
    </>
  );
}
