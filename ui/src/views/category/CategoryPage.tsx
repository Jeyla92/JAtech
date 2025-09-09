// ui/src/views/category/CategoryPage.tsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../start/ProductGrid";
import styles from './CategoryPage.module.css'
import { Link } from "react-router-dom";

export default function CategoryPage() {
  const { category } = useParams<{ category?: string }>(); // slug kan saknas (t.ex. /category)
  const [products, setProducts] = useState<Product[]>()

  useEffect(() => {
    if (!category) {
      return;
    }
    fetch('http://localhost:3000/api/products-by-category/' + encodeURIComponent(category))
    .then((data) => data.json())
    .then((data) => setProducts(data))
  }, [category])


  return (
    <section className={styles.categoryPageContainer}>
      <h2>Kategorisida</h2>
      {category ? (
        <p>Visar kategori: {category}</p>
      ) : (
        <p>Ingen kategori vald. Testa t.ex. <code>/category/laptop</code>.</p>
      )}
      <div className={styles.productWrapper} >
        {products?.map((product, index) => (
        <Link to={`/product/${product.id}`} className={styles.link}>
          <div key={index}>
          <div>
            <img className={styles.imageStyle} src={'../../../' + product.pictureURL} />
          </div>
          <div className={styles.productWrapperContent}>
            <div className={styles.productNameAndBrand}>
              <h3>
                {product.name}
              </h3>
              <h4>
                {product.brand}
              </h4>
            </div>
            <div>
              <h3>
                {product.price}
              </h3>
            </div>
          </div>
        </div>
        </Link>
      ))}
      </div>
      
    </section>
  );
}
