import React, { useEffect, useState } from "react";
import ProductGrid, { Product } from "./ProductGrid";

export const StartView: React.FC = () => {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/list-product")
      .then(r => (r.ok ? r.json() : Promise.reject(r.statusText)))
      .then(setItems)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section style={{ paddingTop: 16 }}>
      <h2>Välkommen!</h2>
      {loading ? <p>Hämtar produkter…</p> : <ProductGrid products={items} />}
    </section>
  );
};
