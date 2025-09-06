import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import styles from "./ProductGrid.module.css";

export type Product = {
  id: number;
  name: string;
  brand: string;        // hos mig används brand som SKU
  price: number;
  pictureURL?: string | null;
};

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className={styles.productGridContainer}>
      {products.map(p => (
        <article key={p.id}
          style={{ border: "1px solid #eee", borderRadius: 12, padding: 12, background: "#fff" }}>
          <Link to={`/product/${p.id}`} style={{ color: "inherit", textDecoration: "none" }}>
            <div style={{
              position: "relative",
              aspectRatio: "3/4",
              background: "#f6f6f6",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}>
              {p.pictureURL
                ? <img src={'../../../' + p.pictureURL} alt={p.name}
                       style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                : <span style={{ color:"#999" }}>Ingen bild</span>}

              {/* Hjärta */}
              <div
                aria-label="Spara produkt"
                onClick={(e) => { e.preventDefault(); /* TODO: favoritlogik */ }}
                className={styles.heartIconWrapper}>
                <Heart color="red" size={18} />
              </div>
            </div>

            <div style={{ display:"flex", justifyContent:"space-between", marginTop: 8 }}>
              <div>
                <div style={{ fontWeight: 600 }}>{p.name}</div>
                <div style={{ fontSize: 12, color:"#666" }}>{p.brand}</div>
              </div>
              <div style={{ fontWeight: 700 }}>{p.price} SEK</div>
            </div>
          </Link>
        </article>
      ))}

      {products.length === 0 && (
        <div style={{ gridColumn:"1/-1", textAlign:"center", color:"#666", padding:"24px 0" }}>
          Inga produkter.
        </div>
      )}
    </div>
  );
}
