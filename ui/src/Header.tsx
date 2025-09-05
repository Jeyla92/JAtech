// ui/src/Header.tsx
import React from "react";
import { Heart, ShoppingBasket } from "lucide-react";
import styles from "./views/start/StartView.module.css"; // återanvänder din css

const kategorier = ["Laptop", "Skärmar", "Stationära Datorer"];

export default function Header() {
  return (
    <div className={styles.startViewContainer}>
      <div>
        <div>
          <img className={styles.logo} src="/logopicture.jpg" alt="Logopicture" />
        </div>

        <div className={styles.searchAndIcons}>
          <input type="text" placeholder="Sök produkt här..." />
          <div><Heart /></div>
          <div><ShoppingBasket /></div>
        </div>
      </div>

      <div className={styles.categories}>
        <ul>
          {kategorier.map((kategori, index) => (
            <li key={index}>{kategori}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
