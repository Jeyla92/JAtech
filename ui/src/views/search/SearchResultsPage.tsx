// ui/src/views/search/SearchResultsPage.tsx
import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import ProductGrid, { Product } from "../start/ProductGrid";
import styles from './SearchResultPage.module.css'

export default function SearchResultsPage() {
  const [params] = useSearchParams();
  const q = (params.get("q") || "").trim();

  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Hjälpare för att ta bort onödiga ' eller " runt strängar
  const clean = (s?: string) => (s ?? "").replace(/^['"]+|['"]+$/g, "");

  useEffect(() => {
    let abort = false;

    async function run() {
      if (!q) {
        setItems([]);
        return;
      }
      setLoading(true);
      setError(null);

      try {
        // ⬇️ relativ URL → funkar i dev & build
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: Product[] = await res.json();

        if (!abort) {
          const normalized = data.map(p => ({
            ...p,
            name: clean((p as any).name),
            brand: clean((p as any).brand),
          })) as Product[];
          setItems(normalized);
        }
      } catch (e: any) {
        if (!abort) setError(e.message || "Kunde inte hämta sökresultat.");
      } finally {
        if (!abort) setLoading(false);
      }
    }

    run();
    return () => { abort = true; };
  }, [q]);

  const heading = useMemo(
    () => `Hittade ${items.length} produkt${items.length === 1 ? "" : "er"}`,
    [items.length]
  );

  return (
    <section className={styles.searchResultPageContainer}>
      <h2>{heading}</h2>
      {q && (
        <p>
          Du sökte på: <em>“{q}”</em>
        </p>
      )}

      {loading && <p>Letar produkter…</p>}
      {error && <p>Fel: {error}</p>}

      {!loading && !error && q && items.length === 0 && (
        <div>
          <p>Inga produkter matchar din sökning.</p>
          <p><Link to="/">Till startsidan</Link></p>
        </div>
      )}

      {!loading && !error && items.length > 0 && <ProductGrid bySearchPage={true} products={items} />}
    </section>
  );
}
