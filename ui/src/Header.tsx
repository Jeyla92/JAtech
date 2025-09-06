// ui/src/Header.tsx
import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ShoppingBasket } from "lucide-react";
import styles from "./views/start/StartView.module.css";

const kategorier = ["Laptop", "Skärmar", "Stationära Datorer"];

export default function Header() {
  const [term, setTerm] = useState("");
  const navigate = useNavigate();

  function goToSearch(q: string) {
    const t = q.trim();
    if (!t) return;
    // enklare än template string -> undviker backtick-fel
    navigate("/search?q=" + encodeURIComponent(t));
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    goToSearch(term);
  }

  return (
    <div className={styles.startViewContainer}>
      <div>
        <div>
          <img className={styles.logo} src="/logopicture.jpg" alt="Logopicture" />
        </div>

        <div className={styles.searchAndIcons}>
          {/* Form så Enter i input triggar submit */}
          <form
            onSubmit={onSubmit}
            style={{ display: "flex", gap: 8, alignItems: "center", flex: 1 }}
          >
            <input
              type="text"
              placeholder="Sök produkt här..."
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              aria-label="Sök produkter"
              style={{ width: "100%" }}
            />
            {/* dold submit-knapp så Enter fungerar */}
            <input type="submit" style={{ display: "none" }} />
          </form>

          <div><Heart /></div>
          <div><ShoppingBasket /></div>
        </div>
      </div>

      {/* Kategorierna navigerar också till söksidan */}
      <div className={styles.categories}>
        <ul>
          {kategorier.map((kategori) => (
            <li
              key={kategori}
              onClick={() => goToSearch(kategori)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") goToSearch(kategori);
              }}
              role="button"
              tabIndex={0}
              style={{ cursor: "pointer" }}
              title={`Sök på ${kategori}`}
            >
              {kategori}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
