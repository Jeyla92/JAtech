import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductList.module.css'

type Product = {
  id: number;
  name: string;
  brand: string;
  price: number;
  categoryName?: string | null;
  pictureURL?: string | null;
};

export default function ProductsList() {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [seeding, setSeeding] = useState(false);

  async function load() {
    try {
      setLoading(true);
      setError(null);
      const r = await fetch('http://localhost:3000/api/list-product');
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const data: Product[] = await r.json();
      setItems(data);
    } catch (e: any) {
      setError(e.message || 'Kunde inte hämta produkter.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  if (loading) return <div>Loading…</div>;
  if (error) return <div>Fel: {error}</div>;

  return (
    <div className="admin-container">
      <div className="admin-header"><h1>Administration</h1></div>

      <div className="display-flex">
        <div className="admin-sidebar">
          <a href="/admin/products">Produkter</a>
          <a href="/admin/categories/list-categories">Kategorier</a>
        </div>

        <div>
          <div className={styles.productHeading}>
            <h2>Produkter <small>({items.length})</small></h2>
            <div>
              <Link to="/admin/products/new"><button>Ny produkt</button></Link>
            </div>
          </div>

          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.tableHeader}>Namn</th>
                <th className={styles.tableHeader}>Kategori</th>
                <th className={styles.tableHeader}>SKU</th>
                <th className={styles.tableHeader}>Pris</th>
              </tr>
            </thead>
            <tbody>
              {items.map(p => (
                <tr key={p.id}>
                  <td className={styles.tableCell}>
                    {p.pictureURL ? (
                      <img
                        src={'../../../../' + p.pictureURL}
                        alt=""
                        className={styles.productImage}
                      />
                    ) : null}
                    {p.name}
                  </td>
                  <td className={styles.tableCellBorder}>{p.categoryName ?? ''}</td>
                  <td className={styles.tableCellBorder}>{p.SKU}</td>
                  <td className={styles.tableCellBorder}>{p.price}</td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={4}>
                    Inga produkter ännu.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
