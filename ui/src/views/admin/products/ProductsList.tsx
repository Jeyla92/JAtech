import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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

  async function handleSeed() {
    try {
      setSeeding(true);
      setError(null);
      const r = await fetch('http://localhost:3000/api/dev/seed-all', { method: 'POST' });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      await r.json();
      await load(); // ladda om listan när seeden är klar
    } catch (e: any) {
      setError(e.message || 'Kunde inte skapa demodata.');
    } finally {
      setSeeding(false);
    }
  }

  if (loading) return <div>Loading…</div>;
  if (error) return <div style={{ color: 'red' }}>Fel: {error}</div>;

  return (
    <div className="admin-container">
      <div className="admin-header"><h1>Administration</h1></div>

      <div className="display-flex">
        <div className="admin-sidebar">
          <a href="/admin/products">Produkter</a>
          <a href="/admin/categories/list-categories">Kategorier</a>
        </div>

        <div style={{ flex: 1, padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, gap: 8 }}>
            <h2>Produkter <small style={{ color: '#666', fontWeight: 400 }}>({items.length})</small></h2>
            <div style={{ display: 'flex', gap: 8 }}>
              <Link to="/admin/products/new"><button>Ny produkt</button></Link>
            </div>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ccc', padding: 8, textAlign: 'left' }}>Namn</th>
                <th style={{ border: '1px solid #ccc', padding: 8, textAlign: 'left' }}>Kategori</th>
                <th style={{ border: '1px solid #ccc', padding: 8, textAlign: 'left' }}>SKU/Brand</th>
                <th style={{ border: '1px solid #ccc', padding: 8, textAlign: 'right' }}>Pris</th>
              </tr>
            </thead>
            <tbody>
              {items.map(p => (
                <tr key={p.id}>
                  <td style={{ border: '1px solid #eee', padding: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                    {p.pictureURL ? (
                      <img
                        src={'../../../../' + p.pictureURL}
                        alt=""
                        style={{ width: 36, height: 36, objectFit: 'cover', borderRadius: 4 }}
                      />
                    ) : null}
                    {p.name}
                  </td>
                  <td style={{ border: '1px solid #eee', padding: 8 }}>{p.categoryName ?? ''}</td>
                  <td style={{ border: '1px solid #eee', padding: 8 }}>{p.brand}</td>
                  <td style={{ border: '1px solid #eee', padding: 8, textAlign: 'right' }}>{p.price}</td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={4} style={{ padding: 12, textAlign: 'center', color: '#666' }}>
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
