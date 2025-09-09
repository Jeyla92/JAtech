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

export default function ProductGrid({ products, bySearchPage }: { products: Product[], bySearchPage: boolean} ) {


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
    {!bySearchPage && (
      <>
        <div className={styles.heroContainer}>
      {hero?.pictureURL
      ? <img 
          src={'../../../' + hero?.pictureURL} 
          alt={hero?.name}
          className={styles.imageStyle} />
      : <span >Ingen bild</span>}
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
              className={styles.imageStyle} />
              <h2 className={styles.spotName}>{spot?.name}</h2>  
            </div>
        ))}
    </div>
      </>
    )}
    <div className={styles.productGridContainer}>
      {products.map(p => (
        <article 
          key={p.id}
          className={styles.productWrapper}
        >
          <Link to={`/product/${p.id}`} className={styles.link}>
            <div className={styles.productWrapperContent}>
              {p.pictureURL
                ? <img src={'../../../' + p.pictureURL} alt={p.name}
                       className={styles.imageStyle} />
                : <span>Ingen bild</span>}

              {/* Hjärta */}
              <div
                aria-label="Spara produkt"
                onClick={(e) => { e.preventDefault(); /* TODO: favoritlogik */ }}
                className={styles.heartIconWrapper}>
                <Heart color="red" size={18} />
              </div>
            </div>

            <div className={styles.namePriceAndBrand}>
              <div>
                <h4>{p.name}</h4>
                <h5>{p.brand}</h5>
              </div>
              <h4>{p.price} SEK</h4>
            </div>
          </Link>
        </article>
      ))}

      {products.length === 0 && (
        <div>
          Inga produkter.
        </div>
      )}
    </div>
    </>
  );
}
