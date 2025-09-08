// ui/src/views/product/ProductPage.tsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "./ProductPage.module.css";

type Product = {
  id: number;
  name: string;
  description: string;
  pictureURL: string | null;
  brand: string;
  price: number;
  categoryId: number | null;
  categoryName?: string | null;
};

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [similar, setSimilar] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let ignore = false;

    async function load() {
      setLoading(true);
      setErr(null);
      try {
        const res = await fetch(`http://localhost:3000/api/product/${id}`);
        if (!res.ok) throw new Error("Kunde inte hämta produkt");
        const data = await res.json();
        console.log(data);
        if (!ignore) {
          setProduct(data.product);
          setSimilar(data.similar ?? []);
          document.title = `${data.product.name} | Freaky Fashion`;
        }
      } catch (e: any) {
        if (!ignore) setErr(e.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    load();
    return () => {
      ignore = true;
    };
  }, [id]);

  if (!id) return <section className={styles.container}>Ingen produkt vald.</section>;
  if (loading) return <section className={styles.container}>Laddar…</section>;
  if (err || !product) return <section className={styles.container}>Något gick fel.</section>;

  return (
    <section className={styles.container}>
      <div className={styles.productMain}>
        <div className={styles.productImage}>
          {product.pictureURL ? (
            <img src={'../../../' + product.pictureURL} alt={product.name} />
          ) : (
            <div style={{ padding: 40, textAlign: "center", color: "#777" }}>
              Ingen bild
            </div>
          )}
        </div>

        <div className={styles.productInfo}>
           <h1>{product.name}</h1>
           <p className="brand">{product.brand}</p>
          <p className="desc">{product.description || "Ingen beskrivning."}</p>
          <p className="price">{product.price} SEK</p>

          <button
            onClick={() => console.log("Lägg i varukorg", product.id)}
            className={styles.addBtn}
          >
            Lägg i varukorg
          </button>
        </div>
      </div>

      <section className={styles.similar}>
        <h2>Liknande produkter</h2>
        <div className={styles.similarGrid}>
          {similar.map((s) => (
            <Link key={s.id} to={`/product/${s.id}`} className={styles.card}>
              <div className={styles.cardImage}>
                {s.pictureURL ? (
                  <img src={'../../../' + s.pictureURL} alt={s.name} />
                ) : (
                  <div style={{ color: "#777", textAlign: "center", paddingTop: 40 }}>
                    Ingen bild
                  </div>
                )}
              </div>
              <div className={styles.cardMeta}>
                <div>
                  <div>{s.name}</div>
                  <div style={{ fontSize: 12, color: "#666" }}>{s.brand}</div>
                </div>
                <div>{s.price} SEK</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </section>
  );
}
