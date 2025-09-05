import React, { useState } from "react";
import styles from "./NewCategory.module.css";
import { useNavigate } from "react-router-dom";

export const NewCategory: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) return setError("Namn är obligatoriskt.");
    if (name.length > 25) return setError("Max 25 tecken.");
    if (!file) return setError("Välj en bild.");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("categoryImage", file); 

    try {
      const res = await fetch("http://localhost:3000/api/category", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Kunde inte spara kategorin");
      // tillbaks till listan
      navigate("/admin/categories/list-categories");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Administration</h1>
      </div>

      <div className="display-flex">
        <aside className="admin-sidebar">
          <a href="/admin/products">Produkter</a>
          <a href="/admin/categories/list-categories">Kategorier</a>
        </aside>

        <main className={styles.content}>
          <h2>Ny kategori</h2>

          <form onSubmit={onSubmit} className={styles.form}>
            <label>
              Namn
              <input
                type="text"
                placeholder="Ange namn"
                maxLength={25}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
            <p className={styles.hint}>Obligatoriskt, max 25 tecken.</p>

            <label>
              Bild
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                required
              />
            </label>

            <div className={styles.actions}>
              <button type="submit" className={styles.primaryBtn}>Lägg till</button>
            </div>

            {error && <p className={styles.error}>{error}</p>}
          </form>
        </main>
      </div>
    </div>
  );
};
