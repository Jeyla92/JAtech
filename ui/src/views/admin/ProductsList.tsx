import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type Product = { id:number; name:string; brand:string; price:number };

export default function ProductsList() {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string|null>(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/list-product')
      .then(r => r.ok ? r.json() : Promise.reject(r.statusText))
      .then(setItems)
      .catch(e => setError(String(e)))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading…</div>;
  if (error) return <div style={{color:'red'}}>Fel: {error}</div>;

  return (
    <div className="admin-container">
      <div className="admin-header"><h1>Administration</h1></div>
      <div className="display-flex">
        <div className="admin-sidebar">
          <a href="/admin/products">Produkter</a>
          <a href="/admin/categories/list-categories">Kategorier</a>
        </div>

        <div style={{ flex:1, padding:'16px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
            <h2>Produkter</h2>
            <Link to="/admin/products/new"><button>Ny produkt</button></Link>
          </div>

          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            <thead>
              <tr>
                <th style={{ border:'1px solid #ccc', padding:8, textAlign:'left' }}>Namn</th>
                <th style={{ border:'1px solid #ccc', padding:8, textAlign:'left' }}>SKU/Brand</th>
                <th style={{ border:'1px solid #ccc', padding:8, textAlign:'right' }}>Pris</th>
              </tr>
            </thead>
            <tbody>
              {items.map(p => (
                <tr key={p.id}>
                  <td style={{ border:'1px solid #eee', padding:8 }}>{p.name}</td>
                  <td style={{ border:'1px solid #eee', padding:8 }}>{p.brand}</td>
                  <td style={{ border:'1px solid #eee', padding:8, textAlign:'right' }}>{p.price}</td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr><td colSpan={3} style={{ padding:12, textAlign:'center', color:'#666' }}>Inga produkter ännu.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
