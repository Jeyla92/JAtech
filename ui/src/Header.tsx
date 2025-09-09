// ui/src/Header.tsx
import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ShoppingBasket } from "lucide-react";
import styles from "./views/start/StartView.module.css";

export default function Header() {
  const [term, setTerm] = useState("");
  const navigate = useNavigate();

  const [categories, setCategories] = useState<{ name: string}[]>()

  useEffect(() => {
    fetch('http://localhost:3000/api/list-category')
    .then((data) => data.json())
    .then((data) => setCategories(data))
  }, [])

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

  const goToCategory = (category: string) => {
    const t = category.trim();
    if (!t) return;
    navigate("/category/" + encodeURIComponent(t));  
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
            className={styles.searchBar}
          >
            <input
              type="text"
              placeholder="Sök produkt här..."
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              aria-label="Sök produkter"
            />
            {/* dold submit-knapp så Enter fungerar */}
            <input type="submit" className="display-none" />
          </form>

          <div><Heart /></div>
          <div><ShoppingBasket /></div>
        </div>
      </div>

      {/* Kategorierna navigerar också till söksidan */}
      <div className={styles.categories}>
        <ul>
          {categories?.map((category) => (
            <li
              key={category.name}
              onClick={() => goToCategory(category.name)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") goToCategory(category.name);
              }}
              role="button"
              tabIndex={0}
              title={`Sök på ${category.name}`}
            >
              {category.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
