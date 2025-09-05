// ui/src/views/category/CategoryPage.tsx
import React from "react";
import { useParams } from "react-router-dom";

export default function CategoryPage() {
  const { slug } = useParams<{ slug?: string }>(); // slug kan saknas (t.ex. /category)

  return (
    <section style={{ paddingTop: 16 }}>
      <h2>Kategorisida</h2>
      {slug ? (
        <p>Visar kategori: {slug}</p>
      ) : (
        <p>Ingen kategori vald. Testa t.ex. <code>/category/laptop</code>.</p>
      )}
    </section>
  );
}
