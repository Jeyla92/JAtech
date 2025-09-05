// ui/src/views/product/ProductPage.tsx
import React from "react";
import { useParams } from "react-router-dom";

export default function ProductPage() {
  const { id } = useParams<{ id?: string }>(); // id kan saknas (t.ex. /product)

  return (
    <section style={{ paddingTop: 16 }}>
      <h2>Produktsida</h2>
      {id ? (
        <p>Visar produkt med id: {id}</p>
      ) : (
        <p>Ingen produkt vald. Testa t.ex. <code>/product/123</code>.</p>
      )}
    </section>
  );
}
