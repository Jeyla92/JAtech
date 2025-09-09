import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import styles from "./ProductGrid.module.css";
import { useEffect, useState } from "react";

export type Product = {
  id: number;
  name: string;
  brand: string;        // hos mig används brand som SKU
  price: number;
  pictureURL?: string | null;
  description: string;
};

export default function ProductGrid({ products }: { products: Product[] }) {


    const [hero, setHero] = useState<Product>();

    const [spots, setSpots] = useState<Product[]>();

    useEffect(() => {
    const fetchUntilFound = async () => {
      const id = Math.floor(Math.random() * 10) + 10;
      const res = await fetch(`http://localhost:3000/api/product/${id}`);
      const data = await res.json();

      if (data.error === "Not found") {
        setTimeout(fetchUntilFound, 1000); // try again with a new random id
      } else {
        const { product, similar } = data
        setHero(product);
        setSpots(similar);
      }
    };
    fetchUntilFound();
    }, []);

  return (
    <>
    <div className={styles.heroContainer}>
      {hero?.pictureURL
      ? <img src={'../../../' + hero?.pictureURL} alt={hero?.name}
      style={{ width:"100%", height:"100%", objectFit:"cover" }} />
      : <span style={{ color:"#999" }}>Ingen bild</span>}
      <div className={styles.heroNameAndDescription}>
        <h2>
          {hero?.name}
        </h2>
        <p>
          {hero?.description}
        </p>
      </div>
    </div>
    <div className={styles.spotsContainer}>
        {spots?.map((spot) => (
            <div className={styles.singleSpotContainer}>
              <img src={'../../../' + spot?.pictureURL} alt={spot?.name}
              style={{ width:"100%", height:"100%", objectFit:"cover" }} />
              <h2 className={styles.spotName}>{spot?.name}</h2>  
            </div>
        ))}
    </div>
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
    </>
  );
}
