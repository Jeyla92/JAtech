import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './NewProduct.module.css'

type Category = { id: number; name: string }

export default function NewProduct() {
  const navigate = useNavigate()

  // fält
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [brand, setBrand] = useState('')
  const [sku, setSku] = useState('')
  const [price, setPrice] = useState<string>('')
  const [categoryId, setCategoryId] = useState<number | ''>('')
  const [image, setImage] = useState<File | null>(null)

  // övrigt
  const [categories, setCategories] = useState<Category[]>([])
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('http://localhost:3000/api/list-category')
      .then(r => r.json())
      .then(setCategories)
      .catch(() => setCategories([]))
  }, [])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!name.trim()) return setError('Namn är obligatoriskt.')
    if (name.trim().length > 25) return setError('Namn får max vara 25 tecken.')
    if (!image) return setError('Välj en bild.')
    if (!price || isNaN(Number(price))) return setError('Pris måste vara ett tal.')
    if (!categoryId) return setError('Välj en kategori.')

    const fd = new FormData()
    fd.append('name', name.trim())
    fd.append('description', description)
    fd.append('brand', brand.trim())
    fd.append('sku', sku.trim())
    fd.append('price', price)
    fd.append('categoryId', String(categoryId))
    fd.append('productImage', image!)

    try {
      setSaving(true)
      const res = await fetch('/api/product', { method: 'POST', body: fd })
      if (!res.ok) throw new Error('Kunde inte spara produkten')
      navigate('/admin/products')
    } catch (err: any) {
      setError(err.message ?? 'Något gick fel')
    } finally {
      setSaving(false)
    }
  }

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

        
        <main className="admin-content">
          <div className={`${styles.wrap} card`}>
            <h2 className={styles.title}>Ny produkt</h2>

            <form onSubmit={onSubmit} className={styles.form}>
              {/* Namn */}
              <label>
                Namn
                <input
                  type="text"
                  placeholder="Ange namn"
                  value={name}
                  maxLength={25}
                  onChange={e => setName(e.target.value)}
                  required
                />
              </label>
              <small className={styles.hint}>Obligatoriskt, max 25 tecken.</small>

              {/* Beskrivning */}
              <label>
                Beskrivning
                <textarea
                  placeholder="Ange beskrivning"
                  rows={5}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              </label>

              {/* Bild */}
              <label>
                Bild
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => setImage(e.target.files?.[0] ?? null)}
                  required
                />
              </label>
              <small className={styles.hint}>
                Bilden laddas upp till <code>/products/…</code> och URL sparas i databasen.
              </small>

              {/* Brand */}
              <label>
                Märke
                <input
                  type="text"
                  placeholder="Ange märket"
                  value={brand}
                  onChange={e => setBrand(e.target.value)}
                />
              </label>

              {/* SKU */}
              <label>
                SKU
                <input
                  type="text"
                  placeholder="Ange SKU"
                  value={sku}
                  onChange={e => setSku(e.target.value)}
                />
              </label>

              {/* Pris */}
              <label>
                Pris
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                  required
                />
              </label>

              {/* Kategori */}
              <label>
                Kategori
                <select
                  value={categoryId}
                  onChange={e => setCategoryId(Number(e.target.value))}
                  required
                >
                  <option value="">Välj kategori</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </label>

              <div className={styles.actions}>
                <button type="submit" disabled={saving}>
                  {saving ? 'Sparar…' : 'Lägg till'}
                </button>
              </div>

              {error && <p style={{ color: 'red', marginTop: 6 }}>{error}</p>}
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}
